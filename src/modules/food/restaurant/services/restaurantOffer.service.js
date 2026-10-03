import mongoose from 'mongoose';
import { FoodOffer } from '../../admin/models/offer.model.js';
import { validateCreateOfferDto } from '../../admin/validators/offer.validator.js';
import { ValidationError, NotFoundError } from '../../../../core/auth/errors.js';

/**
 * A restaurant's own coupons only — never the platform-wide ones
 * `listPublicOffers` returns, and never another restaurant's.
 */
export async function listMyOffers(restaurantId) {
    const offers = await FoodOffer.find({ restaurantId, restaurantScope: 'selected' })
        .sort({ createdAt: -1 })
        .lean();
    return { offers };
}

/**
 * Creates a coupon scoped to the calling restaurant. `restaurantScope` and
 * `restaurantId` are forced here, never read from the client — a restaurant
 * must never be able to create a platform-wide offer or attribute one to
 * someone else's account by passing a different id.
 */
export async function createMyOffer(restaurantId, body) {
    const validated = validateCreateOfferDto({
        ...body,
        restaurantScope: 'selected',
        restaurantId
    });
    const offer = await FoodOffer.create(validated);
    return { offer: offer.toObject() };
}

export async function updateMyOfferStatus(restaurantId, offerId, status) {
    if (!mongoose.Types.ObjectId.isValid(offerId)) {
        throw new ValidationError('Invalid coupon id');
    }
    if (!['active', 'paused', 'inactive'].includes(status)) {
        throw new ValidationError('Invalid status');
    }
    const offer = await FoodOffer.findOneAndUpdate(
        { _id: offerId, restaurantId, restaurantScope: 'selected' },
        { status },
        { new: true }
    ).lean();
    if (!offer) {
        throw new NotFoundError('Coupon not found');
    }
    return { offer };
}

export async function deleteMyOffer(restaurantId, offerId) {
    if (!mongoose.Types.ObjectId.isValid(offerId)) {
        throw new ValidationError('Invalid coupon id');
    }
    const offer = await FoodOffer.findOneAndDelete({
        _id: offerId,
        restaurantId,
        restaurantScope: 'selected'
    }).lean();
    if (!offer) {
        throw new NotFoundError('Coupon not found');
    }
    return { deleted: true };
}
