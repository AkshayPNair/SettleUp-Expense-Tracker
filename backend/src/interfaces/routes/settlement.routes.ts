import { Router } from "express";
import { SettlementRepository } from "../../infrastructure/database/repositories/SettlementRepository";
import { ExpenseRepository } from "../../infrastructure/database/repositories/ExpenseRepository";
import { BalanceCalculatorService } from "../../infrastructure/services/BalanceCalculatorService";
import { RecordSettlementUseCase } from "../../application/use-cases/settlement/recordSettlementUseCase";
import { SettlementController } from "../controllers/SettlementController";
import { GetSettlementsByGroupUseCase } from "../../application/use-cases/settlement/getSettlementsByGroupUseCase";

const router = Router()

const settlementRepository = new SettlementRepository()
const expenseRepository = new ExpenseRepository()
const balanceCalculator = new BalanceCalculatorService()

const recordSettlementUseCase = new RecordSettlementUseCase(settlementRepository, expenseRepository, balanceCalculator)
const getSettlementsByGroupUseCase = new GetSettlementsByGroupUseCase(settlementRepository)

const settlementController = new SettlementController(recordSettlementUseCase, getSettlementsByGroupUseCase)

router.post('/', (req, res, next) => settlementController.recordSettlement(req, res, next))
router.get("/group/:groupId", (req, res, next) => settlementController.getByGroup(req, res, next))

export default router