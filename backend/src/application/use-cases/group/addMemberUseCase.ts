import { IGroupRepository } from "../../../domain/interfaces/repositories/IGroupRepository";
import { IAddMemberService } from "../../../domain/interfaces/services/IAddMemberService";
import { HttpStatusCode } from "../../../utils/HttpStatusCode";
import { AppError } from "../../error/AppError";
import { ErrorCode } from "../../error/ErrorCode";

export class AddMemberUseCase implements IAddMemberService {
    constructor(
        private _groupRepository: IGroupRepository
    ) { }

    async execute(groupId: string, userId: string): Promise<void> {
        const group = await this._groupRepository.findById(groupId)

        if (!group) {
            throw new AppError(ErrorCode.NOT_FOUND, "Group not found", HttpStatusCode.NOT_FOUND)
        }

        const alreadyMember = group.members.some(m => m.id === userId)
        if (alreadyMember) {
            throw new AppError(
                ErrorCode.VALIDATION_ERROR,
                "User already a group member",
                HttpStatusCode.CONFLICT
            )
        }
        await this._groupRepository.addMember(groupId, userId)
    }
}