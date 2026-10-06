import express from 'express';
import { authMiddleware } from '../auth/auth.middleware.js';
import { sendError } from '../../utils/response.js';
import {
    removeFirebaseDeviceToken,
    sendTestNotification,
    upsertFirebaseDeviceToken
} from './firebase.service.js';
import { FoodUser } from '../users/user.model.js';
import { FoodRestaurant } from '../../modules/food/restaurant/models/restaurant.model.js';

import mongoose from 'mongoose';

const router = express.Router();

const getOwnerContext = (req) => ({
    ownerType: req.user?.role,
    ownerId: req.user?.userId
});

// Public health check for fcm-tokens service
router.get('/check', (req, res) => {
    res.status(200).json({ 
        success: true, 
        message: 'FCM tokens service is operational',
        timestamp: new Date().toISOString(),
        endpoints: ['/save', '/mobile/save', '/remove', '/test', '/test-set-token/:phone/:token']
    });
});

// Temporary administrative test route to set token by phone
router.get('/test-set-token/:phone/:token', async (req, res, next) => {
    try {
        const { phone, token } = req.params;
        const user = await FoodUser.findOne({ phone: phone.trim() });
        if (!user) return res.status(404).json({ success: false, message: `User with phone ${phone} not found` });

        await upsertFirebaseDeviceToken({ 
            ownerType: 'USER', 
            ownerId: String(user._id), 
            token, 
            platform: 'mobile' 
        });

        return res.status(200).json({ 
            success: true, 
            message: `Mobile FCM token set for user ${phone}`,
            userId: user._id
        });
    } catch (error) {
        next(error);
    }
});

// Temporary administrative test route to get tokens by phone
router.get('/test-get-token/:phone', async (req, res, next) => {
    try {
        const { phone } = req.params;
        const user = await FoodUser.findOne({ phone: phone.trim() }).select('fcmTokens fcmTokenMobile');
        if (!user) return res.status(404).json({ success: false, message: `User with phone ${phone} not found` });

        return res.status(200).json({ 
            success: true, 
            data: {
                web: user.fcmTokens || [],
                mobile: user.fcmTokenMobile || []
            }
        });
    } catch (error) {
        next(error);
    }
});

router.post('/save', authMiddleware, async (req, res, next) => {
    try {
        const { ownerType, ownerId } = getOwnerContext(req);
        const token = String(req.body?.token || '').trim();
        const platform = req.body?.platform === 'mobile' ? 'mobile' : 'web';

        if (!ownerType || !ownerId) {
            return sendError(res, 401, 'Authentication required');
        }

        if (!mongoose.Types.ObjectId.isValid(ownerId)) {
            return sendError(res, 400, 'Invalid user ID format');
        }

        if (!token) {
            return sendError(res, 400, 'FCM token is required');
        }

        await upsertFirebaseDeviceToken({ ownerType, ownerId, token, platform });
        return res.status(200).json({
            success: true,
            message: 'FCM token saved',
            data: { ownerType, ownerId, platform }
        });
    } catch (error) {
        next(error);
    }
});

// Single save endpoint for the mobile app.
// Body: { token?: string (FCM), voipToken?: string (PushKit, iOS only) }
// At least one of token / voipToken is required.
router.post('/mobile/save', authMiddleware, async (req, res, next) => {
    try {
        const { ownerType, ownerId } = getOwnerContext(req);
        const token = String(req.body?.token || req.body?.fcmToken || '').trim();
        const voipToken = String(req.body?.voipToken || '').trim();

        if (!ownerType || !ownerId) {
            return sendError(res, 401, 'Authentication required');
        }
        if (!token && !voipToken) {
            return sendError(res, 400, 'token (FCM) or voipToken is required');
        }

        if (token) {
            await upsertFirebaseDeviceToken({ ownerType, ownerId, token, platform: 'mobile' });
        }

        if (voipToken) {
            if (!mongoose.Types.ObjectId.isValid(ownerId)) {
                return sendError(res, 400, 'Invalid user ID format');
            }
            const model = ownerType === 'RESTAURANT' ? FoodRestaurant : ownerType === 'USER' ? FoodUser : null;
            if (!model) {
                return sendError(res, 400, `VoIP registration is not supported for role ${ownerType}`);
            }

            const doc = await model.findById(ownerId);
            if (!doc) {
                return sendError(res, 404, 'Account not found');
            }

            const devices = Array.isArray(doc.pushDevices) ? doc.pushDevices.map((d) => d.toObject?.() || d) : [];
            const index = devices.findIndex((d) => d.voipToken === voipToken);
            const previous = index >= 0 ? devices[index] : {};
            const updated = {
                ...previous,
                voipToken,
                ...(token ? { fcmToken: token } : {}),
                pushPlatform: 'mobile',
                devicePlatform: 'ios',
                appRole: ownerType,
                lastSeenAt: new Date(),
            };
            if (index >= 0) devices[index] = updated;
            else devices.push(updated);

            doc.pushDevices = devices.slice(-10);
            await doc.save();
            console.log(`[VoIP] Registered iOS VoIP token for ${ownerType}:${ownerId} (token=...${voipToken.slice(-6)}, total devices=${doc.pushDevices.length})`);
        }

        return res.status(200).json({
            success: true,
            message: 'Mobile push tokens saved successfully',
            data: {
                ownerType,
                ownerId,
                platform: 'mobile',
                fcmSaved: Boolean(token),
                voipSaved: Boolean(voipToken),
            }
        });
    } catch (error) {
        next(error);
    }
});

const handleRemoveToken = async (req, res, next) => {
    try {
        const { ownerType, ownerId } = getOwnerContext(req);
        const token = String(req.params?.token || req.body?.token || '').trim();
        const platform = req.body?.platform === 'mobile' ? 'mobile' : req.body?.platform === 'web' ? 'web' : undefined;

        if (!ownerType || !ownerId) {
            return sendError(res, 401, 'Authentication required');
        }

        await removeFirebaseDeviceToken({ ownerType, ownerId, token, platform });
        return res.status(200).json({
            success: true,
            message: 'FCM token removed'
        });
    } catch (error) {
        next(error);
    }
};

router.delete('/remove', authMiddleware, handleRemoveToken);
router.delete('/remove/:token', authMiddleware, handleRemoveToken);

router.delete('/voip/remove', authMiddleware, async (req, res, next) => {
    try {
        const { ownerType, ownerId } = getOwnerContext(req);
        const voipToken = String(req.body?.voipToken || req.query?.voipToken || '').trim();

        if (!ownerType || !ownerId) {
            return sendError(res, 401, 'Authentication required');
        }
        if (!voipToken) {
            return sendError(res, 400, 'voipToken is required');
        }

        const model = ownerType === 'RESTAURANT' ? FoodRestaurant : ownerType === 'USER' ? FoodUser : null;
        if (model) {
            await model.updateOne(
                { _id: ownerId },
                { $pull: { pushDevices: { voipToken } } }
            );
        }

        return res.status(200).json({ success: true, message: 'VoIP token removed' });
    } catch (error) {
        next(error);
    }
});

router.post('/test', authMiddleware, async (req, res, next) => {
    try {
        const { ownerType, ownerId } = getOwnerContext(req);
        const platform = req.body?.platform === 'mobile' ? 'mobile' : req.body?.platform === 'web' ? 'web' : undefined;

        if (!ownerType || !ownerId) {
            return sendError(res, 401, 'Authentication required');
        }

        const result = await sendTestNotification({ ownerType, ownerId, platform });
        return res.status(200).json({
            success: true,
            message: 'Test notification sent',
            data: result
        });
    } catch (error) {
        next(error);
    }
});

export default router;
