import { useState } from "react";
import { useGroups } from "../hooks/useGroups";
import { useNavigate } from "react-router-dom";

const Groups = () => {
    const { groups, loading, addGroup } = useGroups()
    const [name, setName] = useState("")
    const navigate = useNavigate()

    return (
        <div className="container">
            <h1>Groups</h1>

            {/* Create Group */}
            <div className="card">
                <h2>Create Group</h2>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Enter group name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button
                        className="button-primary"
                        onClick={() => {
                            addGroup(name)
                            setName("")
                        }}
                    >
                        Create
                    </button>
                </div>
            </div>

            {/* Groups List */}
            <div className="card">
                <h2>Groups List</h2>

                {loading && <p>Loading groups...</p>}

                {!loading && groups.length === 0 && (
                    <p className="muted">No groups created yet</p>
                )}

                <ul className="list">
                    {groups.map((g) => (
                        <li key={g.id} className="list-item">
                            <strong>{g.name}</strong>
                            <button
                                className="button-open"
                                onClick={() => navigate(`/groups/${g.id}`)}
                            >
                                Open Group
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Groups;
