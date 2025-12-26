import { Settlement } from "../../entities/Settlement";

export interface ISettlementRepository {
  create(settlement: Settlement): Promise<void>;
  findByGroupId(groupId: string): Promise<Settlement[]>;
}
