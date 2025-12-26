import { Group } from "../../entities/Group";

export interface IGroupRepository {
  create(group: Group): Promise<void>;
  addMember(groupId: string, userId: string): Promise<void>;
  findById(groupId: string): Promise<Group | null>;
  findByName(name: string): Promise<{ id: string; name: string } | null>;
  findAll(): Promise<Group[]>;
}
