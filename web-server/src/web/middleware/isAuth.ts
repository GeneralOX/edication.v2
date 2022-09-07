import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Since public pages can be retrieved by anybody, we don't throw any errors
// in the authentication middleware. We have further authorization checks when
// we load the page from the database.

export function isAuth(req: Request, res: Response, next: NextFunction) {

    console.log(req.cookies)
    if (req.cookies == undefined) {
        return res.status(401).json({
            code: 401,
            message: "User is not authenticated."
        });
    }
    const { token } = req.cookies;
    if (token) {
        const { userId } = jwt.verify(token, process.env.JWT_KEY);
        req.body.userId = userId;
    }
    next();
};