import { IGroupRepository } from "../../../domain/interfaces/repositories/IGroupRepository";
import { Group } from "../../../domain/entities/Group";
import { GroupModel } from "../models/GroupModel";
import { UserModel } from "../models/UserModel";
import { Op } from "sequelize";

export class GroupRepository implements IGroupRepository {
    async create(group: Group): Promise<void> {
        await GroupModel.create({
            id: group.id,
            name: group.name
        })
    }

    async addMember(groupId: string, userId: string): Promise<void> {
        const group = await GroupModel.findByPk(groupId)
        const user = await UserModel.findByPk(userId)

        if (!group || !user) return
        await group.addMember(user)
    }

    async findById(groupId: string): Promise<Group | null> {
        const group = await GroupModel.findByPk(groupId, {
            include: [{ model: UserModel, as: 'members' }]
        })

        if (!group) return null;

        return {
            id: group.id,
            name: group.name,
            members: group.members?.map(u => ({
                id: u.id,
                name: u.name
            })) || []
        }
    }

    async findByName(name: string): Promise<{ id: string; name: string; } | null> {
        const group = await GroupModel.findOne({
            where: { name: { [Op.like]: name } }
        })

        if (!group) return null;

        return {
            id: group.id,
            name: group.name
        }
    }

    async findAll(): Promise<Group[]> {
        const groups = await GroupModel.findAll({
            order: [["createdAt", "DESC"]]
        })

        return groups.map(g => ({
            id: g.id,
            name: g.name,
            members: [] 
        }))
    }

}
