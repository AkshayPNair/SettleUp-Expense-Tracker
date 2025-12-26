import { Expense } from "../../entities/Expense";
import { Settlement } from "../../entities/Settlement";
import { Balance } from "../../entities/Balance";

export interface IBalanceCalculator {
    calculate(
        expenses: Expense[],
        settlements: Settlement[]
    ): Balance[]
}
