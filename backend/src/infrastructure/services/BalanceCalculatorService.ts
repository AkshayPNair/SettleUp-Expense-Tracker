import { Balance } from "../../domain/entities/Balance";
import { Expense } from "../../domain/entities/Expense";
import { Settlement } from "../../domain/entities/Settlement";
import { IBalanceCalculator } from "../../domain/interfaces/services/IBalanceCalculator";

export class BalanceCalculatorService implements IBalanceCalculator {
    calculate(expenses: Expense[], settlements: Settlement[]): Balance[] {
        const net = new Map<string, number>()

        const add = (userId: string, amount: number) => {
            net.set(userId, (net.get(userId) || 0) + amount)
        }

        for (const expense of expenses) {
            for (const split of expense.splits) {
                if (split.userId === expense.paidBy) continue

                add(split.userId, -split.amount)

                add(expense.paidBy, split.amount)
            }
        }

        for (const settlement of settlements) {
            add(settlement.fromUserId, settlement.amount)
            add(settlement.toUserId, -settlement.amount)
        }

        const creditors: { userId: string; amount: number }[] = []
        const debtors: { userId: string; amount: number }[] = []

        for (const [userId, amount] of net.entries()) {
            if (amount > 0) creditors.push({ userId, amount });
            if (amount < 0) debtors.push({ userId, amount: -amount });
        }

        const balances: Balance[] = [];
        let i = 0, j = 0;

        while (i < debtors.length && j < creditors.length) {
            const debtor = debtors[i]
            const creditor = creditors[j]

            const settleAmount = Math.min(debtor.amount, creditor.amount);

            balances.push({
                fromUserId: debtor.userId,
                toUserId: creditor.userId,
                amount: settleAmount
            });

            debtor.amount -= settleAmount
            creditor.amount -= settleAmount

            if (debtor.amount === 0) i++
            if (creditor.amount === 0) j++
        }

        return balances

    }
}