import { Balance } from "../../entities/Balance";

export interface ICalculateBalancesService {
    execute(groupId: string): Promise<Balance[]>;
}
