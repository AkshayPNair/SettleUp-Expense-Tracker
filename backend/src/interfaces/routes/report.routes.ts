import { Router } from "express";
import { ExpenseRepository } from "../../infrastructure/database/repositories/ExpenseRepository";
import { SettlementRepository } from "../../infrastructure/database/repositories/SettlementRepository";
import { ExportExpenseReportUseCase } from "../../application/use-cases/report/exportExpenseReportUseCase";
import { ExportSettlementReportUseCase } from "../../application/use-cases/report/exportSettlementReportUseCase";
import { ReportController } from "../controllers/ReportController";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepository";

const router = Router()

const expenseRepository = new ExpenseRepository()
const settlementRepository = new SettlementRepository()
const userRepository = new UserRepository()

const exportExpenseReportUseCase = new ExportExpenseReportUseCase(expenseRepository, userRepository)
const exportSettlementReportUseCase = new ExportSettlementReportUseCase(settlementRepository, userRepository)

const reportController = new ReportController(
    exportExpenseReportUseCase,
    exportSettlementReportUseCase
)

router.get('/expenses/:groupId', (req, res, next) => reportController.exportExpenses(req, res, next))
router.get('/settlements/:groupId', (req, res, next) => reportController.exportSettlements(req, res, next))

export default router