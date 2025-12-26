import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getBalances } from "../services/balanceService";
import type { Balance } from "../services/balanceService";

export const useBalances = (groupId: string) => {
    const [balances, setBalances] = useState<Balance[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchBalances = async () => {
        try {
            setLoading(true)
            const data = await getBalances(groupId)
            setBalances(data)
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Failed to fetch balances"
            )
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBalances()
    }, [groupId])

    return {
        balances,
        loading,
        refreshBalances: fetchBalances
    }
}
