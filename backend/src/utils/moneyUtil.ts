// rupees to paise
export const toPaise = (amount: number): number => {
    if (Number.isNaN(amount)) {
        throw new Error("Invalid amount");
    }

    return Math.round(amount * 100);
}

// paise back to rupees
export const toRupee = (paise: number): number => {
    if (Number.isNaN(paise)) {
        throw new Error("Invalid paise amount");
    }

    return paise / 100;
}

//safely add multiple paise values
export const addPaise = (...values: number[]): number => {
    return values.reduce((sum, v) => sum + v, 0);
}

//sum of splits equals total amount
export const validateSplitTotal = (
    total: number,
    splits: number[]
): boolean => {
    const sum = splits.reduce((a, b) => a + b, 0);
    return sum === total;
}