import mongoose from 'mongoose';
import { FoodOrder } from '../../orders/models/order.model.js';
import { sendResponse } from '../../../../utils/response.js';

/**
 * Public: the reviews customers left for one restaurant.
 *
 * Ratings live on the order documents (`ratings.restaurant`), so until now the
 * only way to read them was the admin-only route — which is why the customer
 * app could show an average but never the reviews behind it. The filter
 * mirrors `calculateAndSaveRestaurantRatingStats` in order.service.js.
 */
export const getPublicRestaurantReviewsController = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 200, 'Reviews fetched', { reviews: [], total: 0, page: 1, totalPages: 1 });
    }

    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 20));

    const filter = {
      restaurantId: new mongoose.Types.ObjectId(id),
      'ratings.restaurant.rating': { $exists: true, $ne: null },
    };

    const [rows, total] = await Promise.all([
      FoodOrder.find(filter)
        .select('ratings customerName createdAt updatedAt')
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      FoodOrder.countDocuments(filter),
    ]);

    const reviews = rows
      .map((o) => {
        const r = (o.ratings && o.ratings.restaurant) || {};
        const name = String(o.customerName || '').trim();
        return {
          rating: r.rating,
          comment: r.comment || '',
          // First name only: a public list should not expose full identities.
          customerName: name ? name.split(/\s+/)[0] : 'Customer',
          createdAt: r.ratedAt || o.updatedAt || o.createdAt,
        };
      })
      .filter((r) => typeof r.rating === 'number');

    return sendResponse(res, 200, 'Reviews fetched', {
      reviews,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (error) {
    next(error);
  }
};
