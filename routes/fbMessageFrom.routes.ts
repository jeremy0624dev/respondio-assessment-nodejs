import {NextFunction, Request, Response, Router} from "express";
import {returnError} from "../middlewares/error.js";
import {getAllFbMessageFrom} from "../models/fbMessagesFrom/fbMessageFrom.functions.js";

const router = Router();

router.get("", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const messages = await getAllFbMessageFrom();
        res.status(200).json({ messages });
    } catch(e:any) {
        returnError(res, e);
    }
});

export default router;