import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createUser, getUsers } from "../services/userService";
import type { User } from "../services/userService";

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const data = await getUsers()
            setUsers(data)
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to load users")
        } finally {
            setLoading(false)
        }
    }

    const addUser = async (name: string) => {
        try {
            if (!name.trim()) {
                toast.error("User name is required")
                return
            }

            const user = await createUser(name)
            setUsers(prev => [...prev, user])
            toast.success("User created successfully")
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to create user")
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return {
        users,
        loading,
        addUser
    }
}
