import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../utils/HttpStatusCode";
import { IRecordSettlementService } from "../../domain/interfaces/services/IRecordSettlementService";
import { IGetSettlementsByGroupService } from "../../domain/interfaces/services/IGetSettlementsByGroupService";

export class SettlementController {
  constructor(
    private _recordSettlementService: IRecordSettlementService,
    private _getSettlementsByGroupService: IGetSettlementsByGroupService
  ) { }

  async recordSettlement(req: Request, res: Response, next: NextFunction) {
    try {
      await this._recordSettlementService.execute(req.body)

      res.status(HttpStatusCode.CREATED).json({ success: true, message: "Settlement recorded successfully" })
    } catch (error) {
      next(error)
    }
  }

  async getByGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { groupId } = req.params
      const settlements = await this._getSettlementsByGroupService.execute(groupId)

      res.status(200).json({ success: true, data: settlements })
    } catch (error) {
      next(error)
    }
  }
}
