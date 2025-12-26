import api from './api'

export const recordSettlement = async (payload: { groupId: string; fromUserId: string; toUserId: string; amount: number }): Promise<void> => {
    await api.post('/settlements', payload)
}

export const getSettlementsByGroup = (groupId: string) => {
    return api.get(`/settlements/group/${groupId}`)
}