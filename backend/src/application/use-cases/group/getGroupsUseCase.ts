import { IGroupRepository } from "../../../domain/interfaces/repositories/IGroupRepository";
import { Group } from "../../../domain/entities/Group";
import { IGetGroupsService } from "../../../domain/interfaces/services/IGetGroupsService";

export class GetGroupsUseCase implements IGetGroupsService {
  constructor(private groupRepository: IGroupRepository) {}

  async execute(): Promise<Group[]> {
    return this.groupRepository.findAll();
  }
}
