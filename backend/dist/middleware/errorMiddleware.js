"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({
        msg: err.message,
    });
};
exports.default = errorHandler;
//# sourceMappingURL=errorMiddleware.js.map