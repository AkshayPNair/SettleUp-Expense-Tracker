import { RecordSettlementDTO } from "../../dtos/settlement.dto";

export interface IRecordSettlementService {
  execute(dto: RecordSettlementDTO): Promise<void>;
}
