import { injectable } from "inversify";
import { EventsRepository } from "../../data/repositories/events.repository";


@injectable()
export class EventsService {
    constructor(private readonly repo: EventsRepository) { }

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
            startAt: data.startAt,
            endAt: data.endAt,
            location: data.location,
            owner: id
        });



    }

    async Update(id: string, data: any) {
        return await this.repo.update(
            id,
            {
                title: data.title,
                subtitle: data.subtitle,
                imgUrl: data.imgUrl,
                startAt: data.startAt,
                endAt: data.endAt,
                location: data.location,
            });
    }

    async delete(id: string) {
        return await this.repo.delete(id);
    }

    async join(eventId: string, userId: string) {

        const obj = { event: eventId, user: userId };
        const isExist = await this.repo.findJoined(obj);
        if (isExist.length > 0) {
            return { success: false, message: "You already joined this event!" }
        }
        await this.repo.join(obj);
        return {
            success: true,
            message: "You have been joined the event!"
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

