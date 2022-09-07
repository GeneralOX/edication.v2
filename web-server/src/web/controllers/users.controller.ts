import { Request, Response } from "express";
import { controller, httpGet } from "inversify-express-utils";
import { isAuth } from "../middleware/isAuth";
import { UsersService } from "../services/users.service";

@controller("/users")
export class UsersController {
    constructor(private readonly _service: UsersService) { }

    @httpGet("/me", ...[isAuth])
    async getUser(req: Request, res: Response) {
        const userId = req.body.userId;
console.log( req.body)
        const result = await this._service.GetUser(userId);
        if (!result.success)
            return res.status(401).json({
                message: "User is not authenticated."
            });

        return res.json(result)
    }
}