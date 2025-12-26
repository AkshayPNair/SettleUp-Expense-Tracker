import { CreateGroupDTO } from "../../dtos/createGroup.dto";

export interface ICreateGroupService {
    execute(dto: CreateGroupDTO): Promise<{ id: string; name: string }>;
}
