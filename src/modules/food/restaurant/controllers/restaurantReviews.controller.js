import mongoose from 'mongoose';
import { FoodOrder } from '../../orders/models/order.model.js';
import { FoodRestaurant } from '../models/restaurant.model.js';
import { sendResponse } from '../../../../utils/response.js';

const EMPTY_SUMMARY = {
  rating: { average: 0, count: 0 },
  washroom: { average: 0, count: 0 },
  evCharging: { available: null, yes: 0, no: 0 },
};

const round1 = (sum, count) => (count > 0 ? Number((sum / count).toFixed(1)) : 0);

/**
 * Restaurant rating, washroom rating and EV-charging availability, computed
 * straight from the rated orders.
 *
 * Done here rather than read off the restaurant document because the detail
 * endpoint is cached for 10 minutes; this route is not, so a review shows up
 * in the summary the moment it is submitted.
 *
 * EV charging is crowd-reported (yes/no), so `available` is the majority
 * answer. With no reports, or a tie, it falls back to what the restaurant
 * itself declared — `true` if it says it has a charger, otherwise `null`
 * ("not reported yet").
 */
const buildSummary = async (restaurantObjectId, filter) => {
  const washroomRated = {
    $and: [
      { $isNumber: '$ratings.washroom.rating' },
      { $ne: ['$ratings.washroom.availability', false] },
    ],
  };

  const [agg, restaurant] = await Promise.all([
    FoodOrder.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          ratingSum: { $sum: '$ratings.restaurant.rating' },
          ratingCount: { $sum: 1 },
          washroomSum: { $sum: { $cond: [washroomRated, '$ratings.washroom.rating', 0] } },
          washroomCount: { $sum: { $cond: [washroomRated, 1, 0] } },
          evYes: { $sum: { $cond: [{ $eq: ['$ratings.evCharging.availability', true] }, 1, 0] } },
          evNo: { $sum: { $cond: [{ $eq: ['$ratings.evCharging.availability', false] }, 1, 0] } },
        },
      },
    ]),
    FoodRestaurant.findById(restaurantObjectId).select('facilities.evCharging').lean(),
  ]);

  const a = agg[0] || {};
  const yes = a.evYes || 0;
  const no = a.evNo || 0;
  const declaredEv =
    restaurant?.facilities?.evCharging === true ||
    restaurant?.facilities?.evCharging?.available === true;

  let evAvailable = null;
  if (yes > no) evAvailable = true;
  else if (no > yes) evAvailable = false;
  else if (declaredEv) evAvailable = true;

  return {
    rating: { average: round1(a.ratingSum || 0, a.ratingCount || 0), count: a.ratingCount || 0 },
    washroom: { average: round1(a.washroomSum || 0, a.washroomCount || 0), count: a.washroomCount || 0 },
    evCharging: { available: evAvailable, yes, no },
  };
};

/**
 * Public: the reviews customers left for one restaurant, plus a summary of
 * the restaurant, washroom and EV-charging ratings.
 *
 * Ratings live on the order documents (`ratings.restaurant`, and the facility
 * entries next to it), so until now the only way to read them was the
 * admin-only route. The filter mirrors `calculateAndSaveRestaurantRatingStats`
 * in order.service.js.
 */
export const getPublicRestaurantReviewsController = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 200, 'Reviews fetched', {
        reviews: [],
        total: 0,
        page: 1,
        totalPages: 1,
        summary: EMPTY_SUMMARY,
      });
    }

    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 20));

    const restaurantObjectId = new mongoose.Types.ObjectId(id);
    const filter = {
      restaurantId: restaurantObjectId,
      'ratings.restaurant.rating': { $exists: true, $ne: null },
    };

    const [rows, total, summary] = await Promise.all([
      FoodOrder.find(filter)
        .select('ratings customerName createdAt updatedAt')
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      FoodOrder.countDocuments(filter),
      buildSummary(restaurantObjectId, filter),
    ]);

    const reviews = rows
      .map((o) => {
        const r = (o.ratings && o.ratings.restaurant) || {};
        const washroom = (o.ratings && o.ratings.washroom) || {};
        const ev = (o.ratings && o.ratings.evCharging) || {};
        const name = String(o.customerName || '').trim();
        return {
          rating: r.rating,
          comment: r.comment || '',
          // First name only: a public list should not expose full identities.
          customerName: name ? name.split(/\s+/)[0] : 'Customer',
          createdAt: r.ratedAt || o.updatedAt || o.createdAt,
          washroomRating:
            typeof washroom.rating === 'number' && washroom.availability !== false ? washroom.rating : null,
          evCharging: typeof ev.availability === 'boolean' ? ev.availability : null,
        };
      })
      .filter((r) => typeof r.rating === 'number');

    return sendResponse(res, 200, 'Reviews fetched', {
      reviews,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
      summary,
    });
  } catch (error) {
    next(error);
  }
};
