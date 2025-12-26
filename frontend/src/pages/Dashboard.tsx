import { useState } from "react";
import { useUsers } from "../hooks/useUsers";

const Dashboard = () => {
    const { users, loading, addUser } = useUsers()
    const [name, setName] = useState("")

    const handleCreate = () => {
        addUser(name)
        setName("")
    }

    return (
        <div className="container">
            <h1>SettleUp</h1>

            {/* Create User */}
            <div className="card">
                <h2>Create User</h2>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Enter user name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button className="button-primary" onClick={handleCreate}>
                        Create
                    </button>
                </div>
            </div>

            {/* Users List */}
            <div className="card">
                <h2>Users</h2>
                {loading && <p>Loading users...</p>}

                {!loading && users.length === 0 && (
                    <p className="muted">No users created yet</p>
                )}

                <ul className="list">
                    {users.map((u) => (
                        <li key={u.id} className="list-item">
                            <span>{u.name}</span>
                            <small>{u.id}</small>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
