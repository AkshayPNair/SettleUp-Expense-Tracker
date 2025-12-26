
export interface IGetUsersService {
    execute(): Promise<{ id: string; name: string }[]>;
}
