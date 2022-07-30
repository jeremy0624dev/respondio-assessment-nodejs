import {NextFunction, Request, Response, Router} from "express";
import {returnError} from "../middlewares/error.js";
import {getAllFbMessageTo} from "../models/fbMessagesTo/fbMessageTo.functions.js";

const router = Router();

router.get("", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const messages = await getAllFbMessageTo();
        res.status(200).json({ messages });
    } catch(e:any) {
        returnError(res, e);
    }
});

export default router;