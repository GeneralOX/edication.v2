import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { EventsService } from "../services/events.service";

@controller("/events")
export class EventsController {
    constructor(private readonly service: EventsService) { }
    @httpGet("/find", ...[])
    async GetAll(req: Request, res: Response) {
        const events = await this.service.GetAll();
        return res.json({ success: true, data: events })
    }

    @httpGet("/find/:id", ...[])
    async GetOne(req: Request, res: Response) {
        const event = await this.service.GetOne(req.params.id);
        return res.json({ success: true, data: event })
    }

    @httpPost("/create/:id", ...[])
    async Create(req: Request, res: Response) {
        const event = await this.service.Create(req.params.id, req.body);
        return res.json(event)
    }

    @httpPost("/update/:id", ...[])
    async Update(req: Request, res: Response) {
        const event = await this.service.Update(req.params.id, req.body);
        return res.json({
            success: true,
            data: "Event have been updated!"
        })
    }

    @httpPost("/delete/:id", ...[])
    async Delete(req: Request, res: Response) {
        const event = await this.service.delete(req.params.id);
        return res.json({
            success: true,
            data: "Event have been deleted!"
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