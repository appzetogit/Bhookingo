import { existsSync, readFileSync } from 'fs';
import http2 from 'http2';
import jwt from 'jsonwebtoken';
import { resolve } from 'path';
import { FoodUser } from '../users/user.model.js';
import { FoodRestaurant } from '../../modules/food/restaurant/models/restaurant.model.js';
import { FoodAdmin } from '../admin/admin.model.js';
import { logger } from '../../utils/logger.js';

const OWNER_MODELS = {
    USER: FoodUser,
    RESTAURANT: FoodRestaurant,
    ADMIN: FoodAdmin,
};

const APNS_AUTHORITY = {
    production: 'https://api.push.apple.com',
    sandbox: 'https://api.sandbox.push.apple.com',
};

let cachedApnsClient = null;
let cachedApnsClientMode = null;
let apnsJwtToken = null;
let apnsJwtTokenExpiry = 0;

const sanitizeString = (value) => String(value ?? '').trim().replace(/^["']|["']$/g, '');

const getOwnerModel = (ownerType) => {
    const normalized = String(ownerType || '').trim().toUpperCase();
    if (['ADMIN', 'SUPER_ADMIN', 'SUB_ADMIN'].includes(normalized)) return FoodAdmin;
    return OWNER_MODELS[normalized] || null;
};

const normalizeTokenList = (tokens = []) => {
    const normalized = [...new Set((Array.isArray(tokens) ? tokens : [tokens]).map(sanitizeString).filter(Boolean))];
    return normalized.slice(-20);
};

const normalizeVoipTopic = (topic) => {
    const normalized = sanitizeString(topic);
    if (!normalized) return '';
    return normalized.endsWith('.voip') ? normalized : `${normalized}.voip`;
};

// Restaurant wrapper app gets its own bundle ID; APNS_VOIP_TOPIC is the fallback.
const getVoipTopic = (ownerType) => {
    const normalizedOwnerType = String(ownerType || '').trim().toUpperCase();
    const roleTopic = normalizedOwnerType === 'RESTAURANT'
        ? sanitizeString(process.env.APNS_VOIP_TOPIC_RESTAURANT)
        : '';
    const resolvedTopic = normalizeVoipTopic(roleTopic || process.env.APNS_VOIP_TOPIC);
    if (!resolvedTopic) {
        throw new Error(`APNs VoIP topic is not configured for ${normalizedOwnerType || 'UNKNOWN'}. Set APNS_VOIP_TOPIC_RESTAURANT or APNS_VOIP_TOPIC.`);
    }
    return resolvedTopic;
};

const isApnsProduction = () =>
    String(process.env.APNS_PRODUCTION ?? 'true').toLowerCase() === 'true';

const getApnsAuthority = () => (isApnsProduction() ? APNS_AUTHORITY.production : APNS_AUTHORITY.sandbox);

const getApnsJwtToken = () => {
    const now = Math.floor(Date.now() / 1000);
    if (apnsJwtToken && apnsJwtTokenExpiry > now) {
        return apnsJwtToken;
    }

    const teamId = sanitizeString(process.env.APNS_TEAM_ID);
    const keyId = sanitizeString(process.env.APNS_KEY_ID);
    const keyPathValue = sanitizeString(process.env.APNS_VOIP_P8_PATH);

    if (!teamId || !keyId || !keyPathValue) {
        throw new Error('APNS_TEAM_ID, APNS_KEY_ID and APNS_VOIP_P8_PATH must be set in .env for token-based APNs.');
    }

    const candidatePaths = [keyPathValue, resolve(process.cwd(), keyPathValue)];
    const keyPath = candidatePaths.find((candidate) => existsSync(candidate));
    if (!keyPath) {
        throw new Error(`APNs Auth Key (.p8) not found. Tried: ${candidatePaths.join(', ')}`);
    }

    const privateKey = readFileSync(keyPath, 'utf8');

    apnsJwtToken = jwt.sign({ iss: teamId, iat: now }, privateKey, {
        algorithm: 'ES256',
        header: { alg: 'ES256', kid: keyId },
    });
    apnsJwtTokenExpiry = now + 3000; // Apple accepts a token for up to 60 min; refresh at ~50 min
    return apnsJwtToken;
};

const getApnsClient = () => {
    const authority = getApnsAuthority();
    if (cachedApnsClient && !cachedApnsClient.destroyed && cachedApnsClientMode === authority) {
        return cachedApnsClient;
    }

    const client = http2.connect(authority);
    client.on('error', (error) => {
        logger.warn(`APNs VoIP client error: ${error?.message || error}`);
    });
    client.on('close', () => {
        if (cachedApnsClient === client) {
            cachedApnsClient = null;
            cachedApnsClientMode = null;
        }
    });

    cachedApnsClient = client;
    cachedApnsClientMode = authority;
    return client;
};

const parsePushDevices = (doc) => (Array.isArray(doc?.pushDevices) ? doc.pushDevices : []);

export const logVoipConfigurationWarnings = () => {
    const restaurantTopic = normalizeVoipTopic(process.env.APNS_VOIP_TOPIC_RESTAURANT);
    const fallbackTopic = normalizeVoipTopic(process.env.APNS_VOIP_TOPIC);

    if (!restaurantTopic && !fallbackTopic) {
        logger.warn('[VoIP] Restaurant topic is missing. Set APNS_VOIP_TOPIC_RESTAURANT (or APNS_VOIP_TOPIC as fallback).');
    }
    if (!process.env.APNS_VOIP_P8_PATH || !process.env.APNS_TEAM_ID || !process.env.APNS_KEY_ID) {
        logger.warn('[VoIP] APNs p8 credentials incomplete. Set APNS_TEAM_ID, APNS_KEY_ID and APNS_VOIP_P8_PATH.');
    }
    if (restaurantTopic || fallbackTopic) {
        logger.info(`[VoIP] APNs ready: topic=${restaurantTopic || fallbackTopic} env=${isApnsProduction() ? 'production' : 'sandbox'}`);
    }
};

export const listOwnerVoipTargets = async ({ ownerType, ownerId } = {}) => {
    if (!ownerType || !ownerId) return { iosVoipTokens: [], iosFcmTokens: [], androidFcmTokens: [] };
    const model = getOwnerModel(ownerType);
    if (!model) return { iosVoipTokens: [], iosFcmTokens: [], androidFcmTokens: [] };

    const doc = await model.findById(ownerId).select('pushDevices fcmTokens fcmTokenMobile').lean();
    if (!doc) return { iosVoipTokens: [], iosFcmTokens: [], androidFcmTokens: [] };

    const pushDevices = parsePushDevices(doc);
    const iosVoipTokens = normalizeTokenList(
        pushDevices
            .filter((device) => device?.devicePlatform === 'ios' && device?.voipToken)
            .map((device) => device.voipToken)
    );
    const iosFcmTokens = normalizeTokenList(
        pushDevices
            .filter((device) => device?.devicePlatform === 'ios' && device?.fcmToken)
            .map((device) => device.fcmToken)
    );
    const androidFcmTokens = normalizeTokenList([
        ...pushDevices
            .filter((device) => device?.devicePlatform === 'android' && device?.fcmToken)
            .map((device) => device.fcmToken),
        ...(Array.isArray(doc.fcmTokenMobile) ? doc.fcmTokenMobile : []),
    ]);

    return { iosVoipTokens, iosFcmTokens, androidFcmTokens };
};

/**
 * Sends a PushKit VoIP push to iOS devices. iOS shows CallKit ringing even when the app is killed.
 * payload: { title, body, sound, orderId, type, data }
 */
export const sendVoipPushNotification = async (tokens, payload = {}, options = {}) => {
    const uniqueTokens = normalizeTokenList(tokens);
    if (!uniqueTokens.length) {
        return { successCount: 0, failureCount: 0, results: [] };
    }

    const client = getApnsClient();
    const topic = getVoipTopic(options.ownerType);

    const alertTitle = sanitizeString(payload.title || 'New order request');
    const alertBody = sanitizeString(payload.body || 'You have a new order request.');
    const orderIdentifier = sanitizeString(
        payload.orderId || payload.data?.orderId || payload.orderMongoId || payload.data?.orderMongoId || ''
    );

    const bodyPayload = {
        aps: {
            alert: { title: alertTitle, body: alertBody },
            sound: payload.sound || 'default',
            'content-available': 1,
        },
        ...(payload.data && typeof payload.data === 'object' ? payload.data : {}),
        type: sanitizeString(payload.type || payload.data?.type || 'new_order'),
        title: alertTitle,
        body: alertBody,
        orderId: orderIdentifier,
        orderMongoId: orderIdentifier,
        // flutter_callkit_incoming / CallKit fields
        id: orderIdentifier,
        nameCaller: alertTitle,
        callerName: alertTitle,
        handle: alertBody,
        textAccept: 'Accept',
        textDecline: 'Decline',
        duration: 45000,
        extra: {
            orderId: orderIdentifier,
            ...(payload.data && typeof payload.data === 'object' ? payload.data : {}),
        },
    };

    const results = await Promise.all(uniqueTokens.map((token) => new Promise((resolveResult) => {
        const req = client.request({
            ':method': 'POST',
            ':path': `/3/device/${token}`,
            'apns-topic': topic,
            'apns-push-type': 'voip',
            'apns-priority': '10',
            'apns-expiration': '0',
            'content-type': 'application/json',
            authorization: `bearer ${getApnsJwtToken()}`,
        });

        let responseBody = '';
        let statusCode = 0;
        let responseHeaders = {};

        req.setEncoding('utf8');
        req.on('response', (headers) => {
            statusCode = Number(headers[':status'] || 0);
            responseHeaders = headers;
        });
        req.on('data', (chunk) => {
            responseBody += chunk;
        });
        req.on('end', () => {
            const apnsId = responseHeaders['apns-id'] || 'n/a';
            if (statusCode >= 200 && statusCode < 300) {
                logger.info(`[VoIP] APNs accepted [${statusCode}] apns-id=${apnsId} token=...${token.slice(-6)} topic=${topic}`);
                resolveResult({ token, ok: true, apnsId, statusCode });
                return;
            }
            logger.warn(`[VoIP] APNs rejected [${statusCode}] apns-id=${apnsId} token=...${token.slice(-6)} topic=${topic} error=${responseBody}`);
            resolveResult({
                token,
                ok: false,
                remove: statusCode === 400 || statusCode === 410,
                statusCode,
                error: responseBody || `APNs send failed (${statusCode || 'unknown'})`,
            });
        });
        req.on('error', (error) => {
            logger.error(`[VoIP] APNs request error for token ...${token.slice(-6)}: ${error?.message || error}`);
            resolveResult({ token, ok: false, remove: false, error: error?.message || String(error) });
        });
        req.end(JSON.stringify(bodyPayload));
    })));

    const successCount = results.filter((result) => result.ok).length;
    const failureCount = results.length - successCount;
    logger.info(`[VoIP] Batch: ${successCount} delivered, ${failureCount} failed (topic=${topic})`);
    return { successCount, failureCount, results };
};

export const removeStaleVoipTokens = async (ownerType, ownerId, results = []) => {
    const staleTokens = results.filter((result) => !result.ok && result.remove).map((result) => result.token);
    if (!staleTokens.length) return;

    const model = getOwnerModel(ownerType);
    if (!model) return;

    try {
        await model.updateOne(
            { _id: ownerId },
            { $pull: { pushDevices: { voipToken: { $in: staleTokens } } } }
        );
        logger.info(`[VoIP] Removed ${staleTokens.length} stale VoIP token(s) for ${ownerType}:${ownerId}`);
    } catch (error) {
        logger.warn(`[VoIP] Stale token cleanup failed: ${error?.message || error}`);
    }
};

/**
 * Sends VoIP to the owner's iOS devices only. Returns skipped=true when no VoIP token exists.
 */
export const sendVoipNotificationToOwner = async ({ ownerType, ownerId, payload } = {}) => {
    const { iosVoipTokens } = await listOwnerVoipTargets({ ownerType, ownerId });
    if (!iosVoipTokens.length) {
        return { successCount: 0, failureCount: 0, results: [], skipped: true };
    }

    const result = await sendVoipPushNotification(iosVoipTokens, payload, { ownerType });
    await removeStaleVoipTokens(ownerType, ownerId, result.results);
    return result;
};
