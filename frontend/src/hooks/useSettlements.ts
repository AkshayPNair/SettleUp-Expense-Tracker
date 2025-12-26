import { toast } from "react-toastify";
import { recordSettlement as recordSettlementService, getSettlementsByGroup } from "../services/settlementService";
import { useEffect, useState } from "react";

export interface Settlement {
    id: string;
    fromUserId: string;
    toUserId: string;
    amount: number;
    settledAt: string;
}

export const useSettlements = (
    groupId: string,
    refreshBalances: () => void
) => {

    const [settlements, setSettlements] = useState<Settlement[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchSettlements = async () => {
        try {
            setLoading(true);
            const res = await getSettlementsByGroup(groupId);
            setSettlements(res.data.data);
        } catch {
            toast.error("Failed to load settlements");
        } finally {
            setLoading(false);
        }
    }

    const recordSettlement = async (fromUserId: string, toUserId: string, amount: number) => {
        try {
            if (!fromUserId || !toUserId) {
                toast.error("Both users are required")
                return
            }

            if (fromUserId === toUserId) {
                toast.error("From and To users cannot be same")
                return
            }

            if (!amount || amount <= 0) {
                toast.error("Amount must be greater than zero")
                return
            }

            await recordSettlementService({
                groupId,
                fromUserId,
                toUserId,
                amount
            })

            toast.success("Settlement recorded successfully")
            refreshBalances()
            fetchSettlements()
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Failed to record settlement"
            )
        }
    }
    useEffect(() => {
        fetchSettlements();
    }, [groupId])

    return { settlements,loading,recordSettlement }
}
