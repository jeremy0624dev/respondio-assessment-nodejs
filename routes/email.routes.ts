import {NextFunction, Request, Response, Router} from "express";
import {returnError} from "../middlewares/error.js";
import {getEmails} from "../models/emails/email.functions.js";

const router = Router();

router.get("", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const emails = await getEmails();
        res.status(200).json({ emails });
    } catch(e:any) {
        returnError(res, e);
    }
});

export default router;