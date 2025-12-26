import { useState } from "react";
import { useGroups } from "../hooks/useGroups";
import { useReports } from "../hooks/useReports";

const Reports = () => {
    const { groups } = useGroups()
    const { downloadExpenses, downloadSettlements } = useReports()

    const [selectedGroup, setSelectedGroup] = useState("")

    return (
        <div className="container">
            <h1>Reports</h1>

            <div className="card">
                <h2>Select Group</h2>

                <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                >
                    <option value="">Select a group</option>
                    {groups.map((g) => (
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="card actions ">
                <button
                    className="button-primary"
                    onClick={() => downloadExpenses(selectedGroup)}
                >
                    Download Expense Report
                </button>

                <button
                    className="button-primary"
                    onClick={() => downloadSettlements(selectedGroup)}
                >
                    Download Settlement Report
                </button>
            </div>

        </div>
    )
}

export default Reports
