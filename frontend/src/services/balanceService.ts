import api from "./api";

export interface Balance {
    fromUserId: string;
    toUserId: string;
    amount: number;
}

export const getBalances = async (groupId: string): Promise<Balance[]> => {
    const res = await api.get(`/expenses/balances/${groupId}`);
    return res.data.data;
}