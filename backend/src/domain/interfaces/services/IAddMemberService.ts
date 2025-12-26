export interface IAddMemberService{
    execute(groupId: string, userId: string): Promise<void>;
  }
  