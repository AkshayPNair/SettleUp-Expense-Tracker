import { ISettlementRepository } from "../../../domain/interfaces/repositories/ISettlementRepository";
import { Settlement } from "../../../domain/entities/Settlement";
import { IGetSettlementsByGroupService } from "../../../domain/interfaces/services/IGetSettlementsByGroupService";

export class GetSettlementsByGroupUseCase implements IGetSettlementsByGroupService {
    constructor(
        private _settlementRepository: ISettlementRepository
    ) {}

    async execute(groupId: string): Promise<Settlement[]> {
        return this._settlementRepository.findByGroupId(groupId);
    }
}
