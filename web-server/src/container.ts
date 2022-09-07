import { Container } from "inversify";
import { Database } from "./data/database";
import { CoursesRepository } from "./data/repositories/courses.repository";


import { EventsRepository } from "./data/repositories/events.repository";
import { UsersRepository } from "./data/repositories/users.repository";
import { CoursesService } from "./web/services/courses.service";

import { EventsService } from "./web/services/events.service";
import { UsersService } from "./web/services/users.service";



export const container = new Container({
    defaultScope: "Singleton"
});

container.bind(Database).toSelf()

container.bind(UsersRepository).toSelf()
container.bind(CoursesRepository).toSelf()
container.bind(EventsRepository).toSelf()

container.bind(UsersService).toSelf()
container.bind(CoursesService).toSelf()
container.bind(EventsService).toSelf()


