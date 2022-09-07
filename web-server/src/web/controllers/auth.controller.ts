import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { UsersService } from "../services/users.service";

const emailValidator = body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Email Address is not valid.");
const passwordValidator = body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password has to be 6 chars or more.");
const nameValidator = body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.");

@controller("/auth")
export class AuthController {
    constructor(private readonly _service: UsersService) { }

    @httpPost("/register", ...[nameValidator, emailValidator, passwordValidator])
    async Register(req: Request, res: Response) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false, message: errors.array()[0].msg
            });
        }

        const { name, email, password } = req.body;

        const result = await this._service.Register({
            name,
            email,
            password,
            activationToken: undefined
        });

        if (result.success) {
            const maxAge = 1000 * 60 * 60 * 24 * 3; // 3 days
            res.cookie("token", result.token, {
                httpOnly: true,
                maxAge: maxAge,
                domain: process.env.DOMAIN,
            });

            return res.status(201).json({
                message: result.message,
                userId: result.userId,
            });
        }
        return res.status(400).json(result)
    }

    @httpPost("/login", ...[emailValidator, passwordValidator])
    async Login(req: Request, res: Response) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false, message: errors.array()[0].msg
            });
        }
        const { email, password } = req.body;

        const result = await this._service.Login({
            email,
            password
        })

        if (result.success) {
            const maxAge = 1000 * 60 * 60 * 24 * 3; // 3 days
            res.cookie("token", result.token, {
                httpOnly: true,
                maxAge: maxAge,
                domain: process.env.DOMAIN,
            });

            return res.status(201).json({
                message: result.message,
                userId: result.userId,
            });
        }
        return res.status(400).json(result)
    }

    //ActiveAcount(req: Request, res: Response) { }

    //RestPassword(req: Request, res: Response) { }

    //VerifPasswordReset(req: Request, res: Response) { }
}
