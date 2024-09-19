import HttpStatusCodes from "http-status-codes";
import { Response } from "express";

const responseWithData = (
    res: Response,
    statusCode: number,
    data: object,
    message: string,
    isOk: boolean
) => res.status(statusCode).json({ isOk, data, message, statusCode });
 

const responseNoData = (
    res: Response,
    statusCode: number,
    message: string,
    isOk: boolean
) => res.status(statusCode).json({ isOk, message, statusCode });

export const success = (
    res: Response,
    data: object | Array<object>,
    message: string
) => responseWithData(res, HttpStatusCodes.ACCEPTED, data, message, true);

export const created = (
    res: Response,
    data: object | Array<object>,
    message: string
) => responseWithData(res, HttpStatusCodes.CREATED, data, message, true);

export const unauthorize = (res: Response) =>
    responseNoData(res, HttpStatusCodes.UNAUTHORIZED, "You can't do that!", false);

export const notFound = (res: Response, message: string) =>
    responseNoData(res, HttpStatusCodes.NOT_FOUND, message, false);



export const badRequest = (res: Response, message: string) =>
    responseNoData(res, HttpStatusCodes.BAD_REQUEST, message, false);


export const error = (res: Response, error: Error) =>
    responseWithData(res, HttpStatusCodes.REQUEST_TIMEOUT, error, "Error in server!", false);

