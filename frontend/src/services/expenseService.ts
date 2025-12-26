import api from "./api";

export type SplitType = "EQUAL" | "PERCENTAGE" | "FIXED";

export interface ExpenseSplitPayload {
  userId: string;
  type: SplitType;
  value: number;
}

export const addExpense=async(payload:{groupId:string,paidBy:string,amount:number,splits:ExpenseSplitPayload[]}):Promise<void>=>{
    await api.post("/expenses",payload)
}

