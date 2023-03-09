import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/user";

export interface AuthenticatedRequest extends Request {
    user?: IUser;
}

const requireAuth = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let token: string = "";

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            try {
                // Get token from header
                token = req.headers.authorization.split(" ")[1];

                // Verify token
                const decoded = jwt.verify(
                    token,
                    process.env.JWT_SECRET || ""
                ) as JwtPayload;

                // Get user from the token
                const user = await User.findById(decoded.id);

                // const user = await User.findById(decoded.id).select(
                //     "-password"
                // );

                if (user) {
                    (req as AuthenticatedRequest).user = user;
                    next();
                } else {
                    res.status(401).json({
                        msg: "Not authorized",
                    });
                }
            } catch (error) {
                res.status(401).json({
                    msg: "Not authorized",
                });
            }
        } else {
            res.status(401).json({
                msg: "Not authorized",
            });
        }
    }
);

export default requireAuth;
