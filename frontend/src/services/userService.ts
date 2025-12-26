import api from "./api";

export interface User {
    id: string;
    name: string;
}

export const createUser = async (name: string): Promise<User> => {
    const res = await api.post("/users", { name })
    return res.data.data
}

export const getUsers = async (): Promise<User[]>=>{
    const res = await api.get("/users")
    return res.data.data
}