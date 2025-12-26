import { Request, Response, NextFunction } from "express";
import { IGetUsersService } from "../../domain/interfaces/services/IGetUsersService";
import { ICreateUserService } from "../../domain/interfaces/services/ICreateUserService";
import { HttpStatusCode } from "../../utils/HttpStatusCode";

export class UserController {
  constructor(
    private _createUserService: ICreateUserService,
    private _getUsersService: IGetUsersService
  ) {}

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      const user = await this._createUserService.execute(name);

      res.status(HttpStatusCode.CREATED).json({success: true, message: "user created successfully", data: user})
    } catch (error) {
      next(error)
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this._getUsersService.execute();

      res.status(HttpStatusCode.OK).json({success: true,data: users})
    } catch (error) {
      next(error)
    }
  }
}
