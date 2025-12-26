import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { CreateUserUseCase } from "../../application/use-cases/user/createUserUseCase";
import { GetUsersUseCase } from "../../application/use-cases/user/getUsersUseCase";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepository";

const router = Router();

const userRepository = new UserRepository()

const createUserUseCase = new CreateUserUseCase(userRepository)
const getUsersUseCase = new GetUsersUseCase(userRepository)

const userController = new UserController(
    createUserUseCase,
    getUsersUseCase
)

router.post("/", (req, res, next) => userController.createUser(req, res, next))
router.get("/", (req, res, next) => userController.getUsers(req, res, next))

export default router;
