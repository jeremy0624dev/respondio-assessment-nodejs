import sgMail from '@sendgrid/mail';
import { createEmail } from "../models/emails/email.functions.js";
export async function sendEmail(emailData, emailType) {
    const email = {
        ...emailData,
        from: 'jeremylee0624.dev@gmail.com',
    };
    console.log('emailData =>', email);
    try {
        const [response] = await sgMail.send(email, false);
        const { statusCode, body, headers } = response || {};
        const bodyStr = body ? (typeof body === 'object' ? JSON.stringify(body) : body) : emailData.html;
        const headersStr = typeof headers === 'object' ? JSON.stringify(headers) : headers;
        await createEmail(emailType, statusCode, bodyStr, headersStr);
        console.log('Successfully sent out email');
    }
    catch (error) {
        console.error('Error while sending out email => ', error);
    }
}
