import { Group } from "../../entities/Group";

export interface IGetGroupsService {
  execute(): Promise<Group[]>
}
