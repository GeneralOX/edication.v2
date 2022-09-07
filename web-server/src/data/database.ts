import { injectable } from "inversify";
import mongoose from "mongoose";

import { usersModel } from "./models/users.model";
import { courseModel } from "./models/courses.model";
import { eventsModel } from "./models/events.model";
import { joinedCourseModel } from "./models/joinedCourses.model";
import { joinedEventModel } from "./models/joinedEvents.model";


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

    get event() {
        return this._db.model('event', eventsModel)
    }

    get course() {
        return this._db.model('Course', courseModel)
    }

    get joinedCourse() {
        return this._db.model('JoinedCourse', joinedCourseModel)
    }

    get joinedEvent() {
        return this._db.model('JoinedEvent', joinedEventModel)
    }
}