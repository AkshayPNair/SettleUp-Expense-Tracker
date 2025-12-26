import { ExpenseSplit } from "./ExpenseSplit";

export interface Expense {
  id: string;
  groupId: string;
  paidBy: string;
  amount: number; // paise
  splits: ExpenseSplit[];
  createdAt: Date;
}
