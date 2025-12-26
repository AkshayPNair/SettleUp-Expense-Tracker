import { IExpenseRepository } from "../../../domain/interfaces/repositories/IExpenseRepository"
import { IUserRepository } from "../../../domain/interfaces/repositories/IUserRepository"
import { IExportExpenseReportService } from "../../../domain/interfaces/services/IExportExpenseReportService"
import { toCSV } from "../../../utils/csvUtil"
import { toRupee } from "../../../utils/moneyUtil"

export class ExportExpenseReportUseCase implements IExportExpenseReportService {
    constructor(
        private _expenseRepository: IExpenseRepository,
        private _userRepository: IUserRepository   
    ) {}

    async execute(groupId: string): Promise<string> {
        const expenses = await this._expenseRepository.findByGroupId(groupId)
        const users = await this._userRepository.findAll()

        const userMap = new Map(
            users.map(u => [u.id, u.name])
        )

        const headers = [
            "Expense ID",
            "Paid By",
            "Total Amount",
            "Split User",
            "Split Amount",
            "Split Type",
            "Created At"
        ]

        const rows: (string | number)[][] = []

        for (const expense of expenses) {
            for (const split of expense.splits) {
                rows.push([
                    expense.id,
                    userMap.get(expense.paidBy) ?? expense.paidBy,
                    toRupee(expense.amount),
                    userMap.get(split.userId) ?? split.userId,
                    toRupee(split.amount),
                    split.type,
                    expense.createdAt.toISOString()
                ])
            }
        }

        return toCSV(headers, rows)
    }
}
