import { ISettlementRepository } from "../../../domain/interfaces/repositories/ISettlementRepository"
import { IUserRepository } from "../../../domain/interfaces/repositories/IUserRepository"
import { IExportSettlementReportService } from "../../../domain/interfaces/services/IExportSettlementReportService"
import { toCSV } from "../../../utils/csvUtil"
import { toRupee } from "../../../utils/moneyUtil"

export class ExportSettlementReportUseCase implements IExportSettlementReportService {
    constructor(
        private _settlementRepository: ISettlementRepository,
        private _userRepository: IUserRepository
    ) { }

    async execute(groupId: string): Promise<string> {
        const settlements = await this._settlementRepository.findByGroupId(groupId)
        const users = await this._userRepository.findAll()

        const userMap = new Map(
            users.map(u => [u.id, u.name])
        )

        const headers = [
            "Settlement ID",
            "From User",
            "To User",
            "Amount",
            "Settled At"
        ]

        const rows = settlements.map(s => [
            s.id,
            userMap.get(s.fromUserId) ?? s.fromUserId,
            userMap.get(s.toUserId) ?? s.toUserId,
            toRupee(s.amount),
            s.settledAt.toISOString()
        ])

        return toCSV(headers, rows)
    }
}
