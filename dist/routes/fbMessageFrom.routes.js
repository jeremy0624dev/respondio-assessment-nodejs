import { Router } from "express";
import { returnError } from "../middlewares/error.js";
import { getAllFbMessageFrom } from "../models/fbMessagesFrom/fbMessageFrom.functions.js";
const router = Router();
router.get("", async (req, res, next) => {
    try {
        const messages = await getAllFbMessageFrom();
        res.status(200).json({ messages });
    }
    catch (e) {
        returnError(res, e);
    }
});
export default router;
