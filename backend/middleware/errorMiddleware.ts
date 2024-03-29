import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

const errorHandler: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode).json({
        msg: err.message,
    });
};

export default errorHandler;
