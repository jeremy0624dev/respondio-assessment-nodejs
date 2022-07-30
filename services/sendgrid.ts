import sgMail from '@sendgrid/mail';
import {EmailType} from "../models/emails/email.model.js";
import {createEmail} from "../models/emails/email.functions.js";

export type EmailData = {
    to: string,
    subject: string,
    text: string,
    html: string,
}


export async function sendEmail(emailData: EmailData, emailType: EmailType) {
    const email = {
        ...emailData,
        from: 'jeremylee0624.dev@gmail.com',
    }
    console.log('emailData =>', email)
    try {
        const [response] = await sgMail.send(email, false);
        const { statusCode, body, headers } = response || {};
        const bodyStr = body ? (typeof body === 'object' ? JSON.stringify(body) : body) : emailData.html;
        const headersStr = typeof headers === 'object' ? JSON.stringify(headers) : headers;
        await createEmail(emailType, statusCode, bodyStr, headersStr);
        console.log('Successfully sent out email');
    } catch (error: any) {
        console.error('Error while sending out email => ', error);
    }
}