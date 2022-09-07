import { Container } from "inversify";
import { Database } from "./data/database";
import { UsersRepository } from "./data/repositories/users.repository";
import { UsersService } from "./web/services/users.service";

export const container = new Container({
    defaultScope: "Singleton"
});

container.bind(Database).toSelf()
container.bind(UsersRepository).toSelf()
container.bind(UsersService).toSelf()


