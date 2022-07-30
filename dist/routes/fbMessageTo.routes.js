import { Router } from "express";
import { returnError } from "../middlewares/error.js";
import { getAllFbMessageTo } from "../models/fbMessagesTo/fbMessageTo.functions.js";
const router = Router();
router.get("", async (req, res, next) => {
    try {
        const messages = await getAllFbMessageTo();
        res.status(200).json({ messages });
    }
    catch (e) {
        returnError(res, e);
    }
});
export default router;
