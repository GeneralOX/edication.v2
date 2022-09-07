import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { CoursesService } from "../services/courses.service";

@controller("/courses")
export class CoursesController {
    constructor(private readonly service: CoursesService) { }

    @httpGet("/find", ...[])
    async GetAll(req: Request, res: Response) {
        const courses = await this.service.GetAll();
        return res.json({ success: true, data: courses })
    }

    @httpGet("/find/:id", ...[])
    async GetOne(req: Request, res: Response) {
        const course = await this.service.GetOne(req.params.id);
        return res.json({ success: true, data: course })
    }

    @httpPost("/create/:id", ...[])
    async Create(req: Request, res: Response) {
        const course = await this.service.Create(req.params.id, req.body);
        return res.json({
            id: req.params,
            data: course
        })
    }
    @httpPost("/update/:id", ...[])
    async Update(req: Request, res: Response) {
        const course = await this.service.Update(req.params.id, req.body);
        return res.json({
            success: true,
            data: "Course have been updated!"
        })
    }

    @httpPost("/delete/:id", ...[])
    async Delete(req: Request, res: Response) {
        const course = await this.service.delete(req.params.id);
        return res.json({
            success: true,
            data: "Course have been deleted!"
        })
    }
    @httpPost("/join/:id", ...[])
    async Join(req: Request, res: Response) {
        const result = await this.service.join(req.params.id, req.body.id);
        return res.json(result)
    }

    @httpPost("/participant/:id", ...[])
    async Participant(req: Request, res: Response) {
        const result = await this.service.GetParticipant(req.params.id);
        return res.json(result)
    }
}