import {Response} from "express";

/**
 * Act as the middleware to handle error and return error message as the 404 response of the API
 * @param {Response} res
 * @param {any} e
 */
export function returnError(res: Response, e:any) {
    const errMsg = e?.message || 'Some errors happen.';
    res.status(400).send({
        error: errMsg,
        message: errMsg,
    });
}