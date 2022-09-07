import { injectable } from "inversify";
import mongoose from "mongoose";

import { usersModel } from "./models/users.model";

@injectable()
export class Database {
    private _db: typeof mongoose = mongoose;
    async connect() {
        this._db = await mongoose.connect(process.env.DATABASE_URI!, {
            dbName: process.env.DATABASE_NAME
        });
        console.log("[+] Database connected successfully.");
    }
    get user() {
        return this._db.model('User', usersModel)
    }
}