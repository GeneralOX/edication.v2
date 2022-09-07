import { injectable } from "inversify";
import { Database } from "../database";

@injectable()
export class CoursesRepository {
    constructor(private _dbcontext: Database) { }

    async findAll() {
        return await this._dbcontext.course.find({});
    }

    async findOne(obj: any) {
        return await this._dbcontext.course.findOne(obj);
    }

    async create(dto: any) {
        try {
            const course = await this._dbcontext.course.create(dto)
            return { success: true, id: course._id };
        }
        catch (err) {
            return { success: false, error: err };
        }
    }
    async update(id: string, dto: any) {
        const result = await this._dbcontext.course.updateOne({ _id: id }, dto)
        return { success: true, result };
    }
    async delete(id: string) {
        const result = await this._dbcontext.course.deleteOne({ _id: id })
        return { success: true, result };
    }

    async findJoined(obj: any) {
        return await this._dbcontext.joinedCourse.find(obj);
    }

    async join(obj: any) {
        return await this._dbcontext.joinedCourse.create(obj);
    }

    /**   **/
    async participant(id: string) {
        const ids = (await this._dbcontext.joinedCourse.find({ course: id }))
            .map((r: any) => r.user);
        console.log(ids)
        return await this._dbcontext.user.find({ '_id': { $in: ids } })
    }
}