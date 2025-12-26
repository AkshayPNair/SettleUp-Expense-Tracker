import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getGroupMembers, addMember as addMemberService } from "../services/groupService";
import type { GroupMember } from '../services/groupService'

export const useGroupMembers = (groupId: string) => {
    const [members, setMembers] = useState<GroupMember[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchMembers = async () => {
        try {
            setLoading(true)
            const data = await getGroupMembers(groupId)
            setMembers(data)
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to load members")
        } finally {
            setLoading(false)
        }
    }

    const addMember = async (userId: string) => {
        try {
            await addMemberService(groupId, userId)
            toast.success("Member added to group")
            fetchMembers()
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to add member")
        }
    }

    useEffect(() => {
        fetchMembers()
    }, [groupId])

    return {
        members,
        loading,
        addMember
    }
}
