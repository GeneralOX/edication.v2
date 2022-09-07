import { injectable } from "inversify";
import { Database } from "../database";

@injectable()
export class EventsRepository {
    constructor(private _dbcontext: Database) { }
    async findAll() {
        return await this._dbcontext.event.find({});
    }
    async findOne(obj: any) {
        return await this._dbcontext.event.findOne(obj);
    }
    async create(dto: any) {
        try {
            const event = await this._dbcontext.event.create(dto)
            return { success: true, id: event._id };
        }
        catch (err) {
            return { success: false, error: err };
        }
    }
    async update(id: string, dto: any) {
        const result = await this._dbcontext.event.updateOne({ _id: id }, dto)
        return { success: true, result };
    }
    async delete(id: string) {
        const result = await this._dbcontext.event.deleteOne({ _id: id })
        return { success: true, result };
    }

    async findJoined(obj: any) {
        return await this._dbcontext.joinedEvent.find(obj);
    }

    async join(obj: any) {
        return await this._dbcontext.joinedEvent.create(obj);
    }
    
    async participant(id: string) {
        const ids = (await this._dbcontext.joinedEvent.find({ event: id }))
            .map((r: any) => r.user);
        return await this._dbcontext.user.find({ '_id': { $in: ids } })
    }

}