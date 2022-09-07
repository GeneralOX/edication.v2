import { injectable } from "inversify";
import jwt from "jsonwebtoken";
import { UsersRepository } from "../../data/repositories/users.repository";


@injectable()
export class UsersService {
    constructor(private readonly repo: UsersRepository) { }

    async Register(dto: any) {
        const existingUser = await this.repo.findOne({ username: dto.username });
        if (existingUser) {
            return {
                success: false,
                message: "E-Mail address already exists."
            }
        }
        // dto.password = await bcrypt.hash(dto.password, 12);

        const created = await this.repo.create(dto);
        if (created.success) {
            const token = this.JwtSign(created.id!)
            return {
                success: true,
                userId: created.id,
                message: "User successfully created.",
                token,
            };
        }
        return {
            success: false,
            message: "Cannot create user try again!"
        };
    }

    async Login(dto: any) {
        const user = await this.repo.findOne({ username: dto.username });
        if (!user) {
            return {
                success: false,
                message: "An user with this username could not be found."
            }
        }

        // const isEqual = await bcrypt.compare(dto.password, user.password);
        if (dto.password != user.password) {
            return {
                success: false,
                message: "Wrong password."
            }
        }
        const token = this.JwtSign(user._id)
        return {
            success: true,
            user: user,
            message: "User successfully logged in.",
            token,
        };
    }

    async GetUser(id: any) {
        const user = await this.repo.findOne({ _id: id });
        if (!user) {
            return {
                success: false,
                message: "Error: Cannot found user!"
            }
        }
        return {
            success: true,
            data: user
        }
    }

    async all() {
        const user = await this.repo.findAll();

        return {
            success: true,
            data: user
        }
    }

    async confirm(obj: any) {
        await this.repo.confirm(obj);
        return true;
    }
    async update(id: string, obj: any) {
        await this.repo.update(id, obj);
        return true;
    }
    async delete(obj: any) {
        await this.repo.delete(obj);
        return true;
    }

    /** PRIVATE CONTENT **/
    async GetOwnCourse(id: string) {
        const courses: any[] = await this.repo.getOwnCourse(id);
        return {
            success: true,
            data: courses
        }
    }

    async GetOwnEvent(id: string) {
        const events: any[] = await this.repo.getOwnEvent(id);
        return {
            success: true,
            data: events
        }
    }
    /** PRIVATE CONTENT **/
    async GetUserJoinedCourse(id: string) {
        const courses: any[] = await this.repo.getJoinedCourses(id);
        return {
            success: true,
            data: courses
        }
    }

    async GetUserJoinedEvent(id: string) {
        console.log(id)
        const events: any[] = await this.repo.getJoinedEvents(id);
        return {
            success: true,
            data: events
        }
    }

    /** PRIVATE CONTENT **/
    private JwtSign(id: any) {
        return jwt.sign(
            { userId: id.toString() },
            process.env.JWT_KEY
        );

    }
}