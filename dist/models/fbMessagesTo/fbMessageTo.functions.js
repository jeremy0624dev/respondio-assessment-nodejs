import FbMessageTo from './fbMessageTo.model.js';
/**
 * @param {string} toFbUserId
 * @param {string} fromFbPageId
 * @param {string} message
 * @param {string} clientId
 * @return {iFbMessageTo}
 */
export async function saveMessage(toFbUserId, fromFbPageId, message, clientId) {
    return FbMessageTo.create({
        toFbUserId,
        fromFbPageId,
        message,
        clientId,
    });
}
/**
 * @return {iFbMessageTo[]}
 */
export async function getAllFbMessageTo() {
    return FbMessageTo.find({});
}
