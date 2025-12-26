import { AddExpenseDTO } from "../../../domain/dtos/addExpense.dto";
import { IExpenseRepository } from "../../../domain/interfaces/repositories/IExpenseRepository";
import { IGroupRepository } from "../../../domain/interfaces/repositories/IGroupRepository";
import { IAddExpenseService } from "../../../domain/interfaces/services/IAddExpenseService";
import { HttpStatusCode } from "../../../utils/HttpStatusCode";
import { AppError } from "../../error/AppError";
import { ErrorCode } from "../../error/ErrorCode";
import { expenseMapper } from "../../mappers/expenseMapper";

export class AddExpenseUseCase implements IAddExpenseService {
    constructor(
        private _expenseRepository: IExpenseRepository,
        private _groupRepository: IGroupRepository
    ) { }

    async execute(dto: AddExpenseDTO): Promise<void> {
        const group = await this._groupRepository.findById(dto.groupId)
        if (!group) {
            throw new AppError(ErrorCode.NOT_FOUND, "Group not found", HttpStatusCode.NOT_FOUND)
        }

        if (group.members.length < 2) {
            throw new AppError(ErrorCode.VALIDATION_ERROR, "At least two members are required to add an expense", HttpStatusCode.BAD_REQUEST)
        }

        const isMember = group.members.some(m => m.id === dto.paidBy)
        if (!isMember) {
            throw new AppError(ErrorCode.VALIDATION_ERROR, "Payer not in group", HttpStatusCode.NOT_FOUND)
        }

        const splitTypes = new Set(dto.splits.map(s => s.type))
        if (splitTypes.size > 1) {
            throw new AppError(
                ErrorCode.VALIDATION_ERROR,
                "Mixed split types are not allowed",
                HttpStatusCode.BAD_REQUEST
            )
        }

        if (dto.splits[0]?.type === "PERCENTAGE") {
            const totalPercentage = dto.splits.reduce(
                (sum, s) => sum + s.value,
                0
            )

            if (totalPercentage !== 100) {
                throw new AppError(
                    ErrorCode.VALIDATION_ERROR,
                    "Percentage split must total 100%",
                    HttpStatusCode.BAD_REQUEST
                )
            }
        }

        const expense = expenseMapper.toDomain(dto)

        const totalSplit = expense.splits.reduce(
            (sum, s) => sum + s.amount,
            0
        )

        if (totalSplit !== expense.amount) {
            throw new AppError(
                ErrorCode.VALIDATION_ERROR,
                "Split total does not match expense amount",
                HttpStatusCode.BAD_REQUEST
            )
        }

        await this._expenseRepository.create(expense)
    }
}