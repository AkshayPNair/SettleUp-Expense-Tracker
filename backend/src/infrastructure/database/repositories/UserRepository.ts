import { IUserRepository } from "../../../domain/interfaces/repositories/IUserRepository";
import { UserModel } from "../models/UserModel";
import { Op, fn, col, where } from "sequelize";

export class UserRepository implements IUserRepository {
    async findAll() {
        const users = await UserModel.findAll({
            attributes: ["id", "name"],
            order: [["createdAt", "DESC"]]
        });

        return users.map(u => ({
            id: u.id,
            name: u.name
        }))
    }

    async create(name: string) {
        const user = await UserModel.create({ name });

        return {
            id: user.id,
            name: user.name
        }
    }

    async findByName(name: string) {
        const user = await UserModel.findOne({
            where: where(
                fn("LOWER", col("name")),
                fn("LOWER", name)
            )
        });

        if (!user) return null

        return {
            id: user.id,
            name: user.name
        };
    }
}
