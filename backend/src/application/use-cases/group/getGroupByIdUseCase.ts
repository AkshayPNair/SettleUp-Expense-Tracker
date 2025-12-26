import { IGroupRepository } from "../../../domain/interfaces/repositories/IGroupRepository";
import { Group } from "../../../domain/entities/Group";
import { AppError } from "../../error/AppError";
import { ErrorCode } from "../../error/ErrorCode";
import { HttpStatusCode } from "../../../utils/HttpStatusCode";
import { IGetGroupByIdService } from "../../../domain/interfaces/services/IGetGroupByIdService";

export class GetGroupByIdUseCase implements IGetGroupByIdService{
    constructor(private groupRepository: IGroupRepository) { }

    async execute(groupId: string): Promise<Group> {
        const group = await this.groupRepository.findById(groupId)

        if (!group) {
            throw new AppError(ErrorCode.NOT_FOUND,"Group not found",HttpStatusCode.NOT_FOUND)
        }

        return group
    }
}
