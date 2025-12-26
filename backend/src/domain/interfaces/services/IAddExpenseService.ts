import { AddExpenseDTO } from "../../dtos/addExpense.dto";

export interface IAddExpenseService {
  execute(dto: AddExpenseDTO): Promise<void>;
}
