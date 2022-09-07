import { injectable } from "inversify";
import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { UsersRepository } from "../../data/repositories/users.repository";
import bcrypt from "bcryptjs";

import { userActivateDto, userLoginDto, userRegisterDto, userVerifPasswordRestDto } from "../../cors/dto/users.dto";

@injectable()
export class UsersService {
    constructor(private readonly repo: UsersRepository) { }

    async Register(dto: userRegisterDto) {
        const existingUser = await this.repo.findOne({ email: dto.email });
        if (existingUser) {
            return {
                success: false,
                message: "E-Mail address already exists."
            }
        }
        dto.password = await bcrypt.hash(dto.password, 12);
        dto.activationToken = (await (randomBytes)(20)).toString("hex");

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

    async Login(dto: userLoginDto) {
        const user = await this.repo.findOne({ email: dto.email });
        if (!user) {
            return {
                success: false,
                message: "An user with this email could not be found."
            }
        }

        const isEqual = await bcrypt.compare(dto.password, user.password);
        if (!isEqual) {
            return {
                success: false,
                message: "Wrong password."
            }
        }
        const token = this.JwtSign(user._id)
        return {
            success: true,
            userId: user._id,
            message: "User successfully logged in.",
            token,
        };
    }

    async GetUser(userId: any) {
        const user = await this.repo.findOne({ _id: userId });
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
    //ActivateAcount(dto: userActivateDto) { }

    //RestPassword(uid: string) { }

    //VerifPasswordReset(dto: userVerifPasswordRestDto) { }



    private JwtSign(id: any) {
        return jwt.sign(
            { userId: id.toString() },
            process.env.JWT_KEY
        );

    }
}