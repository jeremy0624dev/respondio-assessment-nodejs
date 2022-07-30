import FbMessageFrom, {iFbMessageFrom} from './fbMessageFrom.model.js';

/**
 * @param {string} fromFbUserId
 * @param {string} toFbPageId
 * @param {string} message
 * @param {string} clientId
 * @return {iFbMessageFrom}
 */
export async function saveMessage (fromFbUserId: string, toFbPageId: string, message: string, clientId: string): Promise<iFbMessageFrom> {
    return FbMessageFrom.create({
        fromFbUserId,
        toFbPageId,
        message,
        clientId,
    });
}

/**
 * Get all message history that are sent from other FB users
 * @return {iFbMessageFrom[]}
 */
export async function getAllFbMessageFrom() {
    return FbMessageFrom.find({});
}