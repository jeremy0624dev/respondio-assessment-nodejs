import Email from "./email.model.js";
/**
 * Create email history from the sent email
 * @param {EmailType} type
 * @param {number} statusCode
 * @param {string} body
 * @param {string} headers
 * @return {iEmail}
 */
export async function createEmail(type, statusCode, body, headers) {
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
export async function getEmails() {
    return Email.find({});
}
