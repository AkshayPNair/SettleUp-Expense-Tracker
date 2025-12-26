import { RecordSettlementDTO } from "../../../domain/dtos/settlement.dto";
import { IExpenseRepository } from "../../../domain/interfaces/repositories/IExpenseRepository";
import { ISettlementRepository } from "../../../domain/interfaces/repositories/ISettlementRepository";
import { IRecordSettlementService } from "../../../domain/interfaces/services/IRecordSettlementService";
import { Balance } from "../../../domain/entities/Balance";
import { HttpStatusCode } from "../../../utils/HttpStatusCode";
import { AppError } from "../../error/AppError";
import { ErrorCode } from "../../error/ErrorCode";
import { settlementMapper } from "../../mappers/settlementMapper";
import { IBalanceCalculator } from "../../../domain/interfaces/services/IBalanceCalculator";

export class RecordSettlementUseCase implements IRecordSettlementService {
    constructor(
        private _settlementRepository: ISettlementRepository,
        private _expenseRepository: IExpenseRepository,
        private _balanceCalculator: IBalanceCalculator
    ) { }

    async execute(dto: RecordSettlementDTO): Promise<void> {
        if (dto.amount <= 0) {
            throw new AppError(
                ErrorCode.VALIDATION_ERROR,
                "Settlement amount must be greater than zero",
                HttpStatusCode.BAD_REQUEST
            )
        }

        const expenses = await this._expenseRepository.findByGroupId(dto.groupId)
        const settlements = await this._settlementRepository.findByGroupId(dto.groupId)

        const balances = this._balanceCalculator.calculate(
            expenses,
            settlements
        )

        const balance = balances.find(
            (b: Balance) =>
                b.fromUserId === dto.fromUserId &&
                b.toUserId === dto.toUserId
        )
        if (!balance) {
            throw new AppError(
              ErrorCode.VALIDATION_ERROR,
              "No outstanding balance between users",
              HttpStatusCode.BAD_REQUEST
            )
          }

          const settlement = settlementMapper.toDomain(dto)

          if (settlement.amount > balance.amount) {
            throw new AppError(
              ErrorCode.VALIDATION_ERROR,
              "Settlement amount exceeds outstanding balance"
            )
          }

          await this._settlementRepository.create(settlement)
    }
}