import { toast } from "react-toastify";
import { downloadExpenseReport,downloadSettlementReport } from "../services/reportService";

const downloadFile = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
};

export const useReports = () => {
    const downloadExpenses = async (groupId: string) => {
        try {
            if (!groupId) {
                toast.error("Group is required")
                return
            }

            const blob = await downloadExpenseReport(groupId)
            downloadFile(blob, `expenses-${groupId}.csv`)
            toast.success("Expense report downloaded")
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Failed to download expense report"
            )
        }
    }

    const downloadSettlements = async (groupId: string) => {
        try {
            if (!groupId) {
                toast.error("Group is required")
                return
            }

            const blob = await downloadSettlementReport(groupId)
            downloadFile(blob, `settlements-${groupId}.csv`)
            toast.success("Settlement report downloaded")
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Failed to download settlement report"
            )
        }
    }

    return {
        downloadExpenses,
        downloadSettlements
    }
}
