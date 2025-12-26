export type SplitType = "EQUAL" | "PERCENTAGE" | "FIXED";

export interface ExpenseSplit {
    userId: string;
    amount: number; // paise
    type: SplitType;
}
