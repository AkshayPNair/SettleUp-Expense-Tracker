import { RecordSettlementDTO } from "../../domain/dtos/settlement.dto";
import { Settlement } from "../../domain/entities/Settlement";
import { toPaise } from "../../utils/moneyUtil";
import { v4 as uuid } from "uuid";

export const settlementMapper = {
    toDomain(dto: RecordSettlementDTO): Settlement {
        return {
            id: uuid(),
            groupId: dto.groupId,
            fromUserId: dto.fromUserId,
            toUserId: dto.toUserId,
            amount: toPaise(dto.amount),
            settledAt: new Date()
        }
    }
}