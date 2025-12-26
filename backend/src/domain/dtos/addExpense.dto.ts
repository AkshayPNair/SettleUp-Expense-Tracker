export interface AddExpenseDTO {
    groupId: string;
    paidBy: string;
    amount: number; // rupees from UI
    splits: {
      userId: string;
      value: number; // percentage or fixed rupees
      type: "EQUAL" | "PERCENTAGE" | "FIXED";
    }[];
  }
  