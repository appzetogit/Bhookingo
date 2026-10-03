import {
    listMyOffers,
    createMyOffer,
    updateMyOfferStatus,
    deleteMyOffer
} from '../services/restaurantOffer.service.js';
import { sendResponse } from '../../../../utils/response.js';

export const listMyOffersController = async (req, res, next) => {
    try {
        const restaurantId = req.user?.userId;
        const data = await listMyOffers(restaurantId);
        return sendResponse(res, 200, 'Coupons fetched successfully', data);
    } catch (error) {
        next(error);
    }
};

export const createMyOfferController = async (req, res, next) => {
    try {
        const restaurantId = req.user?.userId;
        const data = await createMyOffer(restaurantId, req.body || {});
        return sendResponse(res, 201, 'Coupon created successfully', data);
    } catch (error) {
        next(error);
    }
};

export const updateMyOfferStatusController = async (req, res, next) => {
    try {
        const restaurantId = req.user?.userId;
        const data = await updateMyOfferStatus(restaurantId, req.params.id, req.body?.status);
        return sendResponse(res, 200, 'Coupon updated successfully', data);
    } catch (error) {
        next(error);
    }
};

export const deleteMyOfferController = async (req, res, next) => {
    try {
        const restaurantId = req.user?.userId;
        await deleteMyOffer(restaurantId, req.params.id);
        return sendResponse(res, 200, 'Coupon deleted successfully', { deleted: true });
    } catch (error) {
        next(error);
    }
};
