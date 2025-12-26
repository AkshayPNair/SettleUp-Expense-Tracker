import { Router } from "express";
import { GroupRepository } from "../../infrastructure/database/repositories/GroupRepository";
import { CreateGroupUseCase } from "../../application/use-cases/group/createGroupUseCase";
import { AddMemberUseCase } from "../../application/use-cases/group/addMemberUseCase";
import { GroupController } from "../controllers/GroupController";
import { GetGroupsUseCase } from "../../application/use-cases/group/getGroupsUseCase";
import { GetGroupByIdUseCase } from "../../application/use-cases/group/getGroupByIdUseCase";

const router = Router()

const groupRepository = new GroupRepository()

const createGroupUseCase = new CreateGroupUseCase(groupRepository)
const addMemberUseCase = new AddMemberUseCase(groupRepository)
const getGroupsUseCase = new GetGroupsUseCase(groupRepository)
const getGroupByIdUseCase = new GetGroupByIdUseCase(groupRepository)

const groupController = new GroupController(
    createGroupUseCase,
    addMemberUseCase,
    getGroupsUseCase,
    getGroupByIdUseCase
)

router.post('/', (req, res, next) => groupController.createGroup(req, res, next))
router.get('/', (req, res, next) => groupController.getGroups(req, res, next))
router.get("/:groupId", (req, res, next) => groupController.getGroupById(req, res, next))
router.post('/add-member', (req, res, next) => groupController.addMember(req, res, next))

export default router

