import { Settlement } from "../../entities/Settlement";

export interface IGetSettlementsByGroupService {
  execute(groupId: string): Promise<Settlement[]>;
}
