import {NextFunction, Request, Response, Router} from "express";
import {createClient, getAllClients, getClient} from "../models/clients/client.functions.js";
import {returnError} from "../middlewares/error.js";

const router = Router();

router.get("", async (req: Request, res: Response, next: NextFunction) => {
    let result: { clients?: any[]; client?: any } = {};
    try {
        const id = req.query.id;
        if (!id) {
            result.clients = await getAllClients();
        } else {
            result.client = await getClient(id.toString());
        }
        res.status(200).json(result);
    } catch(e:any) {
        returnError(res, e);
    }
});

router.post("/new", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, pageAccessToken } = req.body;
        const clientId = await createClient(name, email, pageAccessToken);
        res.status(200).json({ clientId });

    } catch(e:any) {
        returnError(res, e);
    }
});

export default router;