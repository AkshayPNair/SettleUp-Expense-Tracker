import { IExpenseRepository } from "../../../domain/interfaces/repositories/IExpenseRepository";
import { Expense } from "../../../domain/entities/Expense";
import { ExpenseModel } from "../models/ExpenseModel";
import { ExpenseSplitModel } from "../models/ExpenseSplitModel";
import { sequelize } from "../sequelize";

export class ExpenseRepository implements IExpenseRepository {
    async create(expense: Expense): Promise<void> {
        await sequelize.transaction(async (transaction) => {
            const createdExpense = await ExpenseModel.create(
                {
                    id: expense.id,
                    amount: expense.amount,
                    GroupId: expense.groupId,
                    paidByUserId: expense.paidBy
                },
                { transaction: transaction }
            )
            for (const split of expense.splits) {
                await ExpenseSplitModel.create(
                    {
                        ExpenseId: createdExpense.id,
                        UserId: split.userId,
                        amount: split.amount,
                        type: split.type
                    },
                    { transaction: transaction }
                )
            }
        })

    }

    async findByGroupId(groupId: string): Promise<Expense[]> {
        const expenses = await ExpenseModel.findAll({
            where: { GroupId: groupId },
            include: [
                {
                    model: ExpenseSplitModel,
                    as: "splits"
                }
            ]
        })

        return expenses.map(e => ({
            id: e.id,
            groupId: e.GroupId,
            paidBy: e.paidByUserId,
            amount: Number(e.amount),
            createdAt: e.createdAt,
            splits: e.splits.map(s => ({
                userId: s.UserId,
                amount: Number(s.amount),
                type: s.type
            }))
        }))
    }

}   