import api from './api'

export const downloadExpenseReport = async (groupId: string) => {
    const res = await api.get(`/reports/expenses/${groupId}`, { responseType: "blob" })
    return res.data
}

export const downloadSettlementReport = async (groupId: string) => {
    const res = await api.get(`/reports/settlements/${groupId}`, {responseType: "blob"})
    return res.data
}