import { injectable } from "inversify";
import { CoursesRepository } from "../../data/repositories/courses.repository";


@injectable()
export class CoursesService {
    constructor(private readonly repo: CoursesRepository) { }

    async GetAll() {
        return await this.repo.findAll();
    }
    async GetOne(id: string) {
        return await this.repo.findOne({ _id: id });
    }
    async Create(id: string, data: any) {
        return await this.repo.create({
            title: data.title,
            subtitle: data.subtitle,

            imgUrl: data.imgUrl,

            subject: data.subject,
            price: data.price,
            places: data.places,
            owner: id,

            startAt: data.startAt,
            endAt: data.endAt,
        });

    }

    async Update(id: string, data: any) {
        return await this.repo.update(
            id,
            {
                title: data.title,
                subtitle: data.subtitle,
                imgUrl: data.imgUrl,
                subject: data.subject,
                price: data.price,
                places: data.places,
                startAt: data.startAt,
                endAt: data.endAt,
            });
    }

    async delete(id: string) {
        return await this.repo.delete(id);
    }

    async join(courseId: string, userId: string) {

        const obj = { course: courseId, user: userId };
        const isExist = await this.repo.findJoined(obj);
        if (isExist.length > 0) {
            return { success: false, message: "You already joined this course!" }
        }
        await this.repo.join(obj);
        return {
            success: true,
            message: "You have been joined the course!"
        }
    }
    async GetParticipant(id: string) {
        console.log(id)
        const users: any[] = await this.repo.participant(id);
        return {
            success: true,
            data: users
        }
    }
}