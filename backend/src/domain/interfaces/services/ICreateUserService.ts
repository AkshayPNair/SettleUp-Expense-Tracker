export interface ICreateUserService {
    execute(name: string): Promise<{ id: string; name: string }>;
  }

  