import { UserModel } from "../../../infrastructure/database/models/UserModel";
import { IGetUsersService } from "../../../domain/interfaces/services/IGetUsersService";
import { IUserRepository } from "../../../domain/interfaces/repositories/IUserRepository";

export class GetUsersUseCase implements IGetUsersService {

  constructor(private _userRepository:IUserRepository){}

  async execute() {
    return this._userRepository.findAll()
  }
}
