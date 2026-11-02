import mongoose from 'mongoose';

const userAddressSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            enum: ['Home', 'Office', 'Other'],
            default: 'Home',
            index: true
        },
        street: {
            type: String,
            required: true,
            trim: true
        },
        additionalDetails: {
            type: String,
            default: '',
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: String,
            required: true,
            trim: true
        },
        zipCode: {
            type: String,
            default: '',
            trim: true
        },
        phone: {
            type: String,
            default: '',
            trim: true
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: {
                // [lng, lat]
                type: [Number],
                default: undefined,
                validate: {
                    validator: (v) =>
                        v === undefined ||
                        (Array.isArray(v) && v.length === 2 && v.every((n) => typeof n === 'number' && Number.isFinite(n))),
                    message: 'location.coordinates must be [lng, lat]'
                }
            }
        },
        isDefault: {
            type: Boolean,
            default: false,
            index: true
        },
        isForReceiver: {
            type: Boolean,
            default: false
        },
        receiverName: {
            type: String,
            default: '',
            trim: true
        },
        receiverPhone: {
            type: String,
            default: '',
            trim: true
        }
    },
    { _id: true, timestamps: true }
);

const userSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            trim: true
        },
        countryCode: {
            type: String,
            default: '+91'
        },
        name: {
            type: String
        },
        email: {
            type: String
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true
        },
        authProvider: {
            type: String,
            enum: ['local', 'google'],
            default: 'local'
        },
        profileImage: {
            type: String,
            default: ''
        },
        fcmTokens: {
            type: [String],
            default: []
        },
        fcmTokenMobile: {
            type: [String],
            default: []
        },
        pushDevices: {
            type: [
                {
                    fcmToken: { type: String, trim: true },
                    voipToken: { type: String, trim: true },
                    pushPlatform: { type: String, enum: ['web', 'mobile'], default: 'mobile' },
                    devicePlatform: { type: String, enum: ['ios', 'android', 'web', 'unknown'], default: 'unknown' },
                    appRole: { type: String, trim: true },
                    deviceId: { type: String, trim: true },
                    lastSeenAt: { type: Date, default: Date.now }
                }
            ],
            default: []
        },
        dateOfBirth: {
            type: Date,
            default: null
        },
        anniversary: {
            type: Date,
            default: null
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other', 'prefer-not-to-say', ''],
            default: ''
        },
        referralCode: {
            type: String
        },
        referredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FoodUser',
            default: null,
            index: true
        },
        referralCount: {
            type: Number,
            default: 0,
            min: 0
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true
        },
        // Set by admin; a blocked user cannot log in or restore their account.
        isBlocked: {
            type: Boolean,
            default: false,
            index: true
        },
        blockedAt: {
            type: Date,
            default: null
        },
        // Set when an admin deletes the account; hidden from the admin customer list.
        deletedByAdmin: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            default: 'USER'
        },
        addresses: {
            type: [userAddressSchema],
            default: []
        },
        deletedAt: {
            type: Date
        }
    },
    {
        collection: 'food_users',
        timestamps: true
    }
);

userSchema.index({ phone: 1 }, { unique: true, sparse: true });
userSchema.index({ 'addresses.location': '2dsphere' });

export const FoodUser = mongoose.model('FoodUser', userSchema);

