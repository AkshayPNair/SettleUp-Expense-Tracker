import { Balance } from "../../../domain/entities/Balance";
import { IExpenseRepository } from "../../../domain/interfaces/repositories/IExpenseRepository";
import { ISettlementRepository } from "../../../domain/interfaces/repositories/ISettlementRepository";
import { IBalanceCalculator } from "../../../domain/interfaces/services/IBalanceCalculator";
import { ICalculateBalancesService } from "../../../domain/interfaces/services/ICalculateBalanceService";

export class CalculateBalancesUseCase implements ICalculateBalancesService{
    constructor(
        private _expenseRepository:IExpenseRepository,
        private  _settlementRepository:ISettlementRepository,
        private _balanceCalculator:IBalanceCalculator
    ){}

    async execute(groupId: string): Promise<Balance[]> {
        const expenses=await this._expenseRepository.findByGroupId(groupId)
        const settlements = await this._settlementRepository.findByGroupId(groupId)

        return this._balanceCalculator.calculate(expenses,settlements)
    }
}