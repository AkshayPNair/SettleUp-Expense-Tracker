import { Router } from "express";
import { ExpenseRepository } from "../../infrastructure/database/repositories/ExpenseRepository";
import { SettlementRepository } from "../../infrastructure/database/repositories/SettlementRepository";
import { GroupRepository } from "../../infrastructure/database/repositories/GroupRepository";
import { BalanceCalculatorService } from "../../infrastructure/services/BalanceCalculatorService";
import { AddExpenseUseCase } from "../../application/use-cases/expense/addExpenseUseCase";
import { CalculateBalancesUseCase } from "../../application/use-cases/expense/calculateBalancesUseCase";
import { ExpenseController } from "../controllers/ExpenseController";

const router = Router()

const expenseRepository = new ExpenseRepository()
const settlementRepository = new SettlementRepository()
const groupRepository = new GroupRepository()
const balanceCalculator = new BalanceCalculatorService()

const addExpenseUseCase = new AddExpenseUseCase(expenseRepository, groupRepository)
const calculateBalancesUseCase = new CalculateBalancesUseCase(expenseRepository, settlementRepository, balanceCalculator)

const expenseController = new ExpenseController(addExpenseUseCase, calculateBalancesUseCase)

router.post('/', (req, res, next) => expenseController.addExpense(req, res, next))
router.get('/balances/:groupId', (req, res, next) => expenseController.getBalances(req, res, next))

export default router