import { Request, Response, NextFunction } from "express";
import { IAddMemberService } from "../../domain/interfaces/services/IAddMemberService";
import { ICreateGroupService } from "../../domain/interfaces/services/ICreateGroupService";
import { HttpStatusCode } from "../../utils/HttpStatusCode";
import { IGetGroupsService } from "../../domain/interfaces/services/IGetGroupsService";
import { IGetGroupByIdService } from "../../domain/interfaces/services/IGetGroupByIdService";

export class GroupController {
    constructor(
        private _createGroupService: ICreateGroupService,
        private _addMemberService: IAddMemberService,
        private _getGroupsService: IGetGroupsService,
        private _getGroupByIdService:IGetGroupByIdService
    ) { }

    async createGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const group = await this._createGroupService.execute(req.body)
            res.status(HttpStatusCode.CREATED).json({ success: true, message: "Group created successfully", data: group })
        } catch (error) {
            next(error)
        }
    }

    async addMember(req: Request, res: Response, next: NextFunction) {
        try {
            const { groupId, userId } = req.body
            await this._addMemberService.execute(groupId, userId)
            res.status(HttpStatusCode.OK).json({ success: true, message: "Member added to group successfully" })
        } catch (error) {
            next(error)
        }
    }

    async getGroups(_req: Request, res: Response, next: NextFunction) {
        try {
            const groups = await this._getGroupsService.execute()
            res.status(HttpStatusCode.OK).json({ success: true, data: groups })
        } catch (error) {
            next(error)
        }
    }

    async getGroupById(req: Request, res: Response, next: NextFunction) {
        try {
            const group = await this._getGroupByIdService.execute(req.params.groupId)
            res.status(HttpStatusCode.OK).json({success: true,data: group})
        } catch (error) {
            next(error);
        }
    }
}