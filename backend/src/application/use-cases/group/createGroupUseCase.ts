import { CreateGroupDTO } from "../../../domain/dtos/createGroup.dto";
import { IGroupRepository } from "../../../domain/interfaces/repositories/IGroupRepository";
import { ICreateGroupService } from "../../../domain/interfaces/services/ICreateGroupService";
import { v4 as uuid } from 'uuid'
import { AppError } from "../../error/AppError";
import { ErrorCode } from "../../error/ErrorCode";
import { HttpStatusCode } from "../../../utils/HttpStatusCode";

export class CreateGroupUseCase implements ICreateGroupService {
    constructor(
        private _groupRepository: IGroupRepository
    ) { }

    async execute(dto: CreateGroupDTO): Promise<{ id: string; name: string }> {

        const existingGroup = await this._groupRepository.findByName(dto.name)
        if (existingGroup) {
            throw new AppError(ErrorCode.VALIDATION_ERROR,"Group name already exists",HttpStatusCode.BAD_REQUEST)
        }

        const groupId = uuid()

        await this._groupRepository.create({
            id: groupId,
            name: dto.name,
            members: []
        })

        return {
            id: groupId,
            name: dto.name
        }
    }
}