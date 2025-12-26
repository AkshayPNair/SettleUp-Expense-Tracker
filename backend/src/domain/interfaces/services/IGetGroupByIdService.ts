import { Group } from "../../entities/Group";

export interface IGetGroupByIdService {
  execute(groupId: string): Promise<Group>;
}
