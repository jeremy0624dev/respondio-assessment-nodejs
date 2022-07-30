import FbMessageTo, {iFbMessageTo} from './fbMessageTo.model.js';

/**
 * @param {string} toFbUserId
 * @param {string} fromFbPageId
 * @param {string} message
 * @param {string} clientId
 * @return {iFbMessageTo}
 */
export async function saveMessage (toFbUserId: string, fromFbPageId: string, message: string, clientId: string): Promise<iFbMessageTo> {
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