import { Expense } from "../../entities/Expense";

export interface IExpenseRepository {
  create(expense: Expense): Promise<void>;
  findByGroupId(groupId: string): Promise<Expense[]>;
}
