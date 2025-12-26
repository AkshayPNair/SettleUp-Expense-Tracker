import { ISettlementRepository } from "../../../domain/interfaces/repositories/ISettlementRepository";
import { Settlement } from "../../../domain/entities/Settlement";
import { SettlementModel } from "../models/SettlementModel";

export class SettlementRepository implements ISettlementRepository {
  async create(settlement: Settlement): Promise<void> {
    await SettlementModel.create({
      id: settlement.id,
      amount: settlement.amount,
      GroupId: settlement.groupId,
      fromUserId: settlement.fromUserId,
      toUserId: settlement.toUserId
    })
  }

  async findByGroupId(groupId: string): Promise<Settlement[]> {
    const settlements = await SettlementModel.findAll({
      where: { GroupId: groupId },
      order: [["createdAt", "DESC"]]
    })

    return settlements.map(s => ({
      id: s.id,
      groupId: s.GroupId,
      fromUserId: s.fromUserId,
      toUserId: s.toUserId,
      amount: Number(s.amount),
      settledAt: s.createdAt
    }))
  }
}
