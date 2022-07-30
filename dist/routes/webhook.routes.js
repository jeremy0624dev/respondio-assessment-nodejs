import { Router } from 'express';
import { handleFbMessage } from "../controllers/customer.controller.js";
import { returnError } from "../middlewares/error.js";
const router = Router();
router.get("/messaging/:clientId", (req, res, next) => {
    try {
        // Your verify token. Should be a random string.
        let VERIFY_TOKEN = "JER-TEST-MESSAGING";
        // Parse the query params
        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];
        // Checks if a token and mode is in the query string of the request
        if (mode && token) {
            // Checks the mode and token sent is correct
            if (mode === 'subscribe' && token === VERIFY_TOKEN) {
                // Responds with the challenge token from the request
                console.log('WEBHOOK_VERIFIED');
                res.status(200).send(challenge);
            }
            else {
                // Responds with '403 Forbidden' if verify tokens do not match
                res.sendStatus(403);
            }
        }
    }
    catch (e) {
        returnError(res, e);
    }
});
router.post("/messaging/:clientId", async (req, res, next) => {
    const clientId = req.params.clientId;
    let body = req.body;
    let fbMessage;
    try {
        // Checks this is an event from a page subscription
        if (body.object === 'page') {
            // Iterates over each entry - there may be multiple if batched
            body.entry.forEach((entry) => {
                // Gets the message. entry.messaging is an array, but
                // will only ever contain one message, so we get index 0
                if (!fbMessage) {
                    const oriMessage = entry?.messaging?.[0];
                    if (oriMessage && oriMessage.sender && oriMessage.recipient && oriMessage.timestamp && oriMessage.message) {
                        fbMessage = entry.messaging[0];
                    }
                }
            });
            if (clientId && fbMessage)
                await handleFbMessage(clientId, fbMessage);
            else {
                console.error("Failed to process the fb message, please make sure to append client ID in the webhook url and to subscribe messages object.");
            }
            // Returns a '200 OK' response to all requests
            res.status(200).send('EVENT_RECEIVED');
        }
        else {
            // Returns a '404 Not Found' if event is not from a page subscription
            res.sendStatus(404);
        }
    }
    catch (e) {
        returnError(res, e);
    }
});
export default router;
