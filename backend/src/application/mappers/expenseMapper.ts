import { AddExpenseDTO } from "../../domain/dtos/addExpense.dto";
import { Expense } from "../../domain/entities/Expense";
import { ExpenseSplit } from "../../domain/entities/ExpenseSplit";
import { toPaise } from "../../utils/moneyUtil";
import { v4 as uuid } from "uuid";

export const expenseMapper = {
    toDomain(dto: AddExpenseDTO): Expense {
        const totalPaise = toPaise(dto.amount)

        let splits: ExpenseSplit[] = []

        if (dto.splits[0].type === "EQUAL") {
            const count = dto.splits.length
            const base = Math.floor(totalPaise / count)
            let remainder = totalPaise - base * count

            splits = dto.splits.map((s) => {
                const extra = remainder > 0 ? 1 : 0
                if (remainder > 0) remainder--

                return {
                    userId: s.userId,
                    amount: base + extra,
                    type: "EQUAL"
                }
            })
        }

        if (dto.splits[0].type === "PERCENTAGE") {
            splits = dto.splits.map(s => ({
                userId: s.userId,
                amount: Math.floor((totalPaise * s.value) / 100),
                type: "PERCENTAGE"
            }))
        }

        if (dto.splits[0].type === "FIXED") {
            splits = dto.splits.map(s => ({
                userId: s.userId,
                amount: toPaise(s.value),
                type: "FIXED"
            }))
        }

        return {
            id: uuid(),
            groupId: dto.groupId,
            paidBy: dto.paidBy,
            amount: totalPaise,
            splits,
            createdAt: new Date()
        }
    }
}