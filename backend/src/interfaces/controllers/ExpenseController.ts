import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../utils/HttpStatusCode";
import { IAddExpenseService } from "../../domain/interfaces/services/IAddExpenseService";
import { ICalculateBalancesService } from "../../domain/interfaces/services/ICalculateBalanceService";

export class ExpenseController {
    constructor(
        private _addExpenseService: IAddExpenseService,
        private _calculateBalancesService: ICalculateBalancesService
    ) { }

    async addExpense(req: Request, res: Response, next: NextFunction) {
        try {
            await this._addExpenseService.execute(req.body)
            res.status(HttpStatusCode.CREATED).json({success: true,message: "Expense added successfully"})
        } catch (error) {
            next(error)
        }
    }

    async getBalances(req: Request, res: Response, next: NextFunction) {
        try {
            const { groupId } = req.params

            const balances = await this._calculateBalancesService.execute(req.params.groupId)
            res.status(HttpStatusCode.OK).json({success: true,data: balances})
        } catch (error) {
            next(error)
        }
    }
}
