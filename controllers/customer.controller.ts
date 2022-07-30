import needle from "needle";
import FbMessagesFrom from '../models/fbMessagesFrom/fbMessageFrom.model.js';
import {saveMessage as saveFromMessage} from "../models/fbMessagesFrom/fbMessageFrom.functions.js";
import {saveMessage as saveToMessage} from "../models/fbMessagesTo/fbMessageTo.functions.js";
import {getClient} from "../models/clients/client.functions.js";
import {getProduct} from "../models/products/product.functions.js";
import {EmailData, sendEmail} from "../services/sendgrid.js";
import {EmailType} from "../models/emails/email.model.js";
import {iProduct} from "../models/products/product.model.js";


export type FbMessage = {
    sender: { id: string },
    recipient: { id: string },
    timestamp: string,
    message: { mid: string, text: string },
}

/**
 * To check if it is the first time this user messages to the FB page
 * @param {string} senderFbUserId Fb user ID of the sender
 * @param {boolean}
 */
async function isFirstTimeMessage(senderFbUserId: string): Promise<boolean> {
    const message = await FbMessagesFrom.findOne({
        fromFbUserId: senderFbUserId,
    });
    return !message;
}

/**
 * Call Fb API to reply message on behalf of the page owner to the sender
 * @param {string} toFbUserId Fb user ID of the user this message reply to
 * @param {string} fromFbPageId Fb page ID that replies this message
 * @param {string} message
 * @param {string} clientId Client ID
 * @param {string} pageAccessToken Fb page access token
 */
async function reply(toFbUserId: string, fromFbPageId: string, message: string, clientId: string, pageAccessToken: string) {
    await saveToMessage(toFbUserId, fromFbPageId, message, clientId);
    try {
        await needle.post(`https://graph.facebook.com/v14.0/me/messages?access_token=${pageAccessToken}`, {
            recipient: {
                id: toFbUserId,
            }, message: {
                text:  message,
            }
        });
        console.log('Successfully replied the fb message!!');
    } catch (err: any) {
        console.error('Error when replying fb message => ', err?.message);
    }
}

/**
 * Generate the html to display the data of product
 * @param {iProduct} product
 * @return {string}
 */
function generateEmailHtmlOfProduct(product: iProduct): string {
    return `<table>
                 <tr>
                    <td><strong>SKU:</strong></td>
                    <td>${product.sku}</td>
                </tr>
                <tr>
                    <td><strong>Description:</strong></td>
                    <td>${product.description}</td>
                </tr>
                <tr>
                    <td><strong>Price:</strong></td>
                    <td>${product.price}</td>
                </tr>
                <tr>
                    <td><strong>Shipping Fee:</strong></td>
                    <td>${product.shipping}</td>
                </tr>
            </table>`
}

/**
 * Analyse the received message from user on Facebook page and to reply with the corresponding detail and action.
 * @param {string} clientId Client's ID
 * @param {FbMessage} fbMessageObj The message object sent from Facebook webhook
 */
export async function handleFbMessage(clientId: string, fbMessageObj: FbMessage) {
    let replyMessage = '';
    const senderFbUserId = fbMessageObj?.sender?.id;
    const fbPageId = fbMessageObj?.recipient?.id;
    let text = fbMessageObj?.message?.text;
    const greetings = [
        'How are you?',
        'I hope you\'re doing well.',
        ' hope you\'re having a great day.',
    ]
    if (!senderFbUserId || !fbPageId || !text) console.error("Missing data from Facebook webhook's message object");
    const client = await getClient(clientId);
    if (!client) {
        console.error('Cannot find client with ID => ', clientId);
        return;
    }
    const { email, pageAccessToken } = client;
    if (!pageAccessToken) throw new Error('Cannot find page access token.');
    const isFirstTime = await isFirstTimeMessage(senderFbUserId);
    await saveFromMessage(senderFbUserId, fbPageId, text, clientId);
    if (isFirstTime) {
        const greeting = greetings[Math.floor(Math.random() * greetings.length)];
        replyMessage = greeting;
    } else {
        const found = text?.trim().match(/^\/desc|price|shipping|buy/g);
        if (found) {
            const [action, productSku] = text?.split(' ');
            console.log('action => ', action);
            console.log('productSku => ', productSku);
            if (['/desc', '/price', '/shipping', '/buy'].includes(action)) {
                const matchedProduct = await getProduct(productSku);
                if (matchedProduct) {
                    if (action === '/desc') replyMessage = matchedProduct.description;
                    else if (action === '/price') replyMessage = `${matchedProduct.price}`;
                    else if (action === '/shipping') replyMessage = `${matchedProduct.shipping}`;
                    else {
                        const emailData:EmailData = {
                            to: email,
                            subject: 'Customer would like to buy product',
                            text: `Product code: ${productSku}`,
                            html: generateEmailHtmlOfProduct(matchedProduct),
                        }
                        sendEmail(emailData, EmailType.OrderAttemptNotification);
                        replyMessage = 'We are passing your order to the customer service.'
                    }

                } else replyMessage = 'The product ID is invalid.';
            }  else {
                replyMessage = `I am sorry. I don't fully understand. Would you like to try again?`;
            }
        }
    }

    if (replyMessage) {
        console.log('replyMessage => ', replyMessage)
        await reply(senderFbUserId, fbPageId, replyMessage, clientId, pageAccessToken);
    }
}