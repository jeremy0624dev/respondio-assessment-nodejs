import Email, {EmailType, iEmail} from "./email.model.js";

/**
 * Create email history from the sent email
 * @param {EmailType} type
 * @param {number} statusCode
 * @param {string} body
 * @param {string} headers
 * @return {iEmail}
 */
export async function createEmail(type: EmailType, statusCode: number, body: string, headers: string): Promise<iEmail> {
    return Email.create({
        type,
        statusCode,
        body,
        headers,
    });
}

/**
 * Get all emails
 * @return {iEmail[]}
 */
export async function getEmails(): Promise<iEmail[]> {
    return Email.find({});
}