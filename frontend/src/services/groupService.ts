import api from "./api";

export interface Group {
    id: string;
    name: string;
}

export interface GroupMember {
    id: string;
    name: string;
}

export const createGroup = async (name: string): Promise<Group> => {
    const res = await api.post("/groups", { name });
    return res.data.data
}

export const getGroups = async (): Promise<Group[]> => {
    const res = await api.get("/groups");
    return res.data.data
}

export const addMember = async(groupId:string, userId:string):Promise<void>=>{
    await api.post("/groups/add-member",{groupId,userId})
}

export const getGroupMembers=async(groupId:string):Promise<GroupMember[]>=>{
    const res = await api.get(`/groups/${groupId}`)
    return res.data.data.members
}