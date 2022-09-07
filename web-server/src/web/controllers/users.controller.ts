import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { isAuth } from "../middleware/isAuth";
import { UsersService } from "../services/users.service";

@controller("/users")
export class UsersController {
    constructor(private readonly _service: UsersService) { }

    @httpGet("/find", ...[])
    async all(req: Request, res: Response) {
        const result = await this._service.all();
        if (!result.success)
            return res.status(401).json({
                message: "User is not authenticated."
            });

        return res.json(result)
    }

    @httpGet("/find/:id", ...[])
    async One(req: Request, res: Response) {
        const userId = req.params.id;
        const result = await this._service.GetUser(userId);
        return res.json(result)
    }

    @httpGet("/confirm/:id", ...[])
    async confirm(req: Request, res: Response) {
        const userId = req.params.id;
        const result = await this._service.confirm({ _id: userId });
        return res.json(result)
    }

    @httpGet("/delete/:id", ...[])
    async delete(req: Request, res: Response) {
        const userId = req.params.id;
        const result = await this._service.delete({ _id: userId });
        return res.json(result)
    }

    @httpPost("/update/:id", ...[])
    async update(req: Request, res: Response) {
        const userId = req.params.id;
        const result = await this._service.update(userId, req.body);
        return res.json(result)
    }

    @httpPost("/courses/:id", ...[])
    async getCourses(req: Request, res: Response) {
        const courses = await this._service.GetOwnCourse(req.params.id);

        return res.json(courses)
    }

    @httpPost("/events/:id", ...[])
    async getEvents(req: Request, res: Response) {
        const events = await this._service.GetOwnEvent(req.params.id);

        return res.json(events)
    }


    @httpPost("/my-courses/:id", ...[])
    async getMyCourses(req: Request, res: Response) {
        const courses = await this._service.GetUserJoinedCourse(req.params.id);

        return res.json(courses)
    }

    @httpPost("/my-events/:id", ...[])
    async getMyEvents(req: Request, res: Response) {
        const events = await this._service.GetUserJoinedEvent(req.params.id);
        return res.json(events)
    }
}