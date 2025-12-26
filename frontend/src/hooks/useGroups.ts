import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getGroups, createGroup } from "../services/groupService";
import type { Group } from "../services/groupService";

export const useGroups = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchGroups = async () => {
        try {
            setLoading(true);
            const data = await getGroups()
            setGroups(data)
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to load groups")
        } finally {
            setLoading(false)
        }
    }

    const addGroup = async (name: string) => {
        try {
            if (!name.trim()) {
                toast.error("Group name is required")
                return
            }

            const group = await createGroup(name)
            setGroups(prev => [...prev, group])
            toast.success("Group created successfully")
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to create group")
        }
    }

    useEffect(() => {
        fetchGroups()
    }, [])

    return { groups, loading, addGroup }
}
