import { Router } from "express";
import { returnError } from "../middlewares/error.js";
import { getAllProducts } from "../models/products/product.functions.js";
const router = Router();
router.get("", async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.status(200).json({ products });
    }
    catch (e) {
        returnError(res, e);
    }
});
export default router;
