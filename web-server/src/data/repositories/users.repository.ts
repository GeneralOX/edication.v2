import { injectable } from "inversify";
import { Database } from "../database";
import mongoose from "mongoose";


@injectable()
export class UsersRepository {
    constructor(private _dbcontext: Database) { }

    async findAll() {
        return await this._dbcontext.user.find({});
    }

    async findOne(obj: any) {
        return await this._dbcontext.user.findOne(obj);
    }

    async confirm(obj: any) {
        const user = await this._dbcontext.user.findOne(obj);
        if (user) {
            user.active = true
            user.save();
        }
        return true;
    }

    async delete(obj: any) {
        const user = await this._dbcontext.user.deleteOne(obj);

        return true;
    }
    async update(id: string, obj: any) {
        const user = await this._dbcontext.user.updateOne({ _id: id }, obj);
        return true;
    }

    async create(dto: any) {
        try {
            const user = await this._dbcontext.user.create(dto)
            return { success: true, id: user._id };
        }
        catch (err) {

            return { success: false, error: err };
        }
    }

    /**   **/
    async getOwnCourse(id: string) {
        return await this._dbcontext.course.find({ owner: id });
    }
    async getOwnEvent(id: string) {
        return await this._dbcontext.event.find({ owner: id });
    }

    /**   **/
    async getJoinedCourses(id: string) {
        const ids = (await this._dbcontext.joinedCourse.find({ user: id }))
            .map((r: any) => r.course);
        console.log(ids)
        return await this._dbcontext.course.find({ '_id': { $in: ids } })
    }

    async getJoinedEvents(id: string) {
        const ids = (await this._dbcontext.joinedEvent.find({ user: id }))
            .map((r: any) => r.event);
        return await this._dbcontext.event.find({ '_id': { $in: ids } })
    }
}