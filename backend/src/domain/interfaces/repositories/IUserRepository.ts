export interface IUserRepository {
    findAll(): Promise<{ id: string; name: string }[]>
    create(name: string): Promise<{ id: string; name: string }>
    findByName(name: string): Promise<{ id: string; name: string } | null>
}
