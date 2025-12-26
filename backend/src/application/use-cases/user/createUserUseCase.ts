import { IUserRepository } from "../../../domain/interfaces/repositories/IUserRepository";
import { ICreateUserService } from "../../../domain/interfaces/services/ICreateUserService";
import { AppError } from "../../error/AppError";
import { ErrorCode } from "../../error/ErrorCode";
import { HttpStatusCode } from "../../../utils/HttpStatusCode";

export class CreateUserUseCase implements ICreateUserService {
  constructor(private userRepository: IUserRepository) { }

  async execute(name: string) {
    if (!name || name.trim() === "") {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        "User name is required",
        HttpStatusCode.BAD_REQUEST
      )
    }

    const existingUser = await this.userRepository.findByName(name.trim());

    if (existingUser) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        "User name already exists",
        HttpStatusCode.CONFLICT
      )
    }

    return this.userRepository.create(name.trim())
  }
}
