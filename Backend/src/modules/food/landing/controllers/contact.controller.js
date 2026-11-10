import { FoodContactInquiry } from '../models/contactInquiry.model.js';
import { FoodBusinessSettings } from '../../admin/models/businessSettings.model.js';
import { getTransporter } from '../../../../utils/email.js';
import { config } from '../../../../config/env.js';
import { sendResponse, sendError } from '../../../../utils/response.js';

const esc = (v) =>
    String(v == null ? '' : v)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

// Public: website "Contact / Get in touch" form. Stores every inquiry and
// emails the admin (business-settings email) so nothing depends on the
// visitor's own mail client the way the old mailto: link did.
export async function submitContactController(req, res, next) {
    try {
        const body = req.body || {};
        const name = String(body.name || '').trim();
        const message = String(body.message || '').trim();
        const email = String(body.email || '').trim();
        const phone = String(body.phone || '').trim();
        const inquiryType = String(body.inquiryType || 'General').trim().slice(0, 60);

        if (!name) return sendError(res, 400, 'Please enter your name.');
        if (!message) return sendError(res, 400, 'Please enter your message.');
        if (!email && !phone) {
            return sendError(res, 400, 'Please provide an email or phone number.');
        }

        const doc = await FoodContactInquiry.create({
            name: name.slice(0, 120),
            phone: phone.slice(0, 20),
            email: email.slice(0, 160),
            message: message.slice(0, 4000),
            inquiryType
        });

        // Notify the admin by email. The inquiry is already stored, so a mail
        // failure never loses the message or fails the request.
        try {
            const settings = await FoodBusinessSettings.findOne().select('email').lean();
            const adminEmail = (settings && settings.email) || 'admin@bhookingo.com';
            const from = config.emailFrom || config.emailUser;
            const subject = `[${inquiryType || 'Website'}] New contact inquiry from ${name || 'a website visitor'}`;
            const html =
                '<div style="font-family:system-ui,Arial,sans-serif;color:#18110D;line-height:1.5;">' +
                '<h2 style="margin:0 0 10px;">New website contact inquiry</h2>' +
                '<p style="margin:0 0 4px;"><b>Inquiry type:</b> ' + esc(inquiryType) + '</p>' +
                '<p style="margin:0 0 4px;"><b>Name:</b> ' + esc(name) + '</p>' +
                '<p style="margin:0 0 4px;"><b>Phone:</b> ' + (esc(phone) || '-') + '</p>' +
                '<p style="margin:0 0 4px;"><b>Email:</b> ' + (esc(email) || '-') + '</p>' +
                '<p style="margin:12px 0 4px;"><b>Message:</b></p>' +
                '<p style="margin:0;white-space:pre-wrap;background:#faf7f4;padding:12px;border-radius:8px;">' +
                esc(message) + '</p></div>';
            const text =
                'New website contact inquiry\n' +
                'Type: ' + inquiryType + '\nName: ' + name + '\nPhone: ' + phone +
                '\nEmail: ' + email + '\n\nMessage:\n' + message;

            await getTransporter().sendMail({
                from: typeof from === 'string' && from.includes('<') ? from : `Bhookingo <${from}>`,
                to: adminEmail,
                replyTo: email || undefined,
                subject,
                html,
                text
            });
            doc.emailedAdmin = true;
            await doc.save();
        } catch (mailErr) {
            console.error('[Contact] admin email failed:', mailErr && mailErr.message ? mailErr.message : mailErr);
        }

        return sendResponse(
            res,
            201,
            "Thanks! Your message has been sent. We'll get back to you soon.",
            { id: String(doc._id) }
        );
    } catch (error) {
        next(error);
    }
}
