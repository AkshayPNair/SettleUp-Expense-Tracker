import { toast } from "react-toastify";
import { addExpense as addExpenseService } from "../services/expenseService";
import type { ExpenseSplitPayload, SplitType } from "../services/expenseService";

export const useExpenses = (groupId: string, refreshBalances:()=>void) => {
    const addExpense = async (
        amount: number,
        paidBy: string,
        _splitType: SplitType,
        splits: ExpenseSplitPayload[]
    ) => {
        try {
            if (!amount || amount <= 0) {
                toast.error("Amount must be greater than zero")
                return
            }

            if (!paidBy) {
                toast.error("Paid by is required")
                return
            }

            await addExpenseService({ groupId, paidBy, amount, splits })
            toast.success("Expense added successfully")
            refreshBalances()
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to add expense")
        }
    }

    return { addExpense };
}
