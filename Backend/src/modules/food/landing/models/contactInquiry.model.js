import mongoose from 'mongoose';

const contactInquirySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        phone: { type: String, trim: true, default: '' },
        email: { type: String, trim: true, default: '' },
        message: { type: String, required: true, trim: true },
        inquiryType: { type: String, trim: true, default: 'General' },
        emailedAdmin: { type: Boolean, default: false },
        source: { type: String, default: 'website' }
    },
    { collection: 'food_contact_inquiries', timestamps: true }
);

export const FoodContactInquiry = mongoose.model('FoodContactInquiry', contactInquirySchema);
