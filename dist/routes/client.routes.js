import { Router } from "express";
import { createClient, getAllClients, getClient } from "../models/clients/client.functions.js";
import { returnError } from "../middlewares/error.js";
const router = Router();
router.get("", async (req, res, next) => {
    let result = {};
    try {
        const id = req.query.id;
        if (!id) {
            result.clients = await getAllClients();
        }
        else {
            result.client = await getClient(id.toString());
        }
        res.status(200).json(result);
    }
    catch (e) {
        returnError(res, e);
    }
});
router.post("/new", async (req, res, next) => {
    try {
        const { name, email, pageAccessToken } = req.body;
        const clientId = await createClient(name, email, pageAccessToken);
        res.status(200).json({ clientId });
    }
    catch (e) {
        returnError(res, e);
    }
});
export default router;
