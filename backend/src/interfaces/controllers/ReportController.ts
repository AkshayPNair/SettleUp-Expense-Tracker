import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../utils/HttpStatusCode";
import { IExportExpenseReportService } from "../../domain/interfaces/services/IExportExpenseReportService";
import { IExportSettlementReportService } from "../../domain/interfaces/services/IExportSettlementReportService";

export class ReportController {
    constructor(
        private _exportExpenseReportService: IExportExpenseReportService,
        private _exportSettlementReportService: IExportSettlementReportService
    ) { }

    async exportExpenses(req: Request, res: Response, next: NextFunction) {
        try {
            const csv = await this._exportExpenseReportService.execute(
                req.params.groupId
            )
            res.header("Content-Type", "text/csv")
            res.status(HttpStatusCode.OK).send(csv)
        } catch (error) {
            next(error)
        }
    }

    async exportSettlements(req: Request, res: Response, next: NextFunction) {
        try {
            const csv = await this._exportSettlementReportService.execute(
                req.params.groupId
            )
            res.header("Content-Type", "text/csv")
            res.status(HttpStatusCode.OK).send(csv)
        } catch (error) {
            next(error)
        }
    }
}
