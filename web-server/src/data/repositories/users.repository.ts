import { injectable } from "inversify";
import { Database } from "../database";
import { userRegisterDto } from "../../cors/dto/users.dto";


@injectable()
export class UsersRepository {
    constructor(private _dbcontext: Database) { }

    findOne(obj: any) {
        return this._dbcontext.user.findOne(obj);
    }

    async create(dto: userRegisterDto) {
        try {
            const user = await this._dbcontext.user.create(dto)
            return { success: true, id: user._id };
        }
        catch (err) {

            return { success: false, error: err };
        }
    }
}