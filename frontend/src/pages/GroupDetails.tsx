import { useParams, useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { useGroupMembers } from "../hooks/useGroupMembers";
import { useState } from "react";
import { useExpenses } from "../hooks/useExpenses";
import type { SplitType } from "../services/expenseService";
import { useBalances } from "../hooks/useBalances";
import { useSettlements } from "../hooks/useSettlements";

const GroupDetails = () => {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const { users } = useUsers()
  const { members, loading, addMember } = useGroupMembers(groupId!)
  const { balances, loading: balancesLoading, refreshBalances } = useBalances(groupId!)
  const { addExpense } = useExpenses(groupId!, refreshBalances)
  const { settlements, recordSettlement } = useSettlements(groupId!, refreshBalances)

  const canAddExpense = members.length > 1;
  const [selectedUser, setSelectedUser] = useState("")
  const [amount, setAmount] = useState("")
  const [paidBy, setPaidBy] = useState("")
  const [splitType, setSplitType] = useState<SplitType>("EQUAL")
  const [splitValues, setSplitValues] = useState<Record<string, number>>({})
  const [fromUser, setFromUser] = useState("");
  const [toUser, setToUser] = useState("");
  const [settleAmount, setSettleAmount] = useState("");

  const updateSplit = (userId: string, value: number) => {
    setSplitValues((prev) => ({
      ...prev,
      [userId]: value
    }))
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="card">
        <button className="button-secondary" onClick={() => navigate("/groups")}>
          ← Back to Groups
        </button>

        <h1>Group Details</h1>
        <p className="muted">Group ID: {groupId}</p>
      </div>

      {/* Members Section */}
      <div className="card">
        <h2>Members</h2>

        {/* Add Member */}
        <div className="form-group">
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select user</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          <button
            className="button-primary"
            onClick={() => {
              if (selectedUser) {
                addMember(selectedUser);
                setSelectedUser("");
              }
            }}
          >
            Add Member
          </button>
        </div>

        {/* Members List */}
        {loading && <p>Loading members...</p>}

        {!loading && members.length === 0 && (
          <p className="muted">No members added yet</p>
        )}

        <ul className="list">
          {members.map((m) => (
            <li key={m.id} className="list-item">
              {m.name}
            </li>
          ))}
        </ul>
      </div>
      {/* Expenses Section */}
      <div className="card">
        <h2>Expenses</h2>

        {!canAddExpense ? (
          <p className="muted">
            Add at least <strong>2 members</strong> to create an expense.
          </p>
        ) : (
          <>
            {/* Amount */}
            <div className="form-group">
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
                <option value="">Paid by</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Split Type */}
            <div className="form-group">
              <select
                value={splitType}
                onChange={(e) => setSplitType(e.target.value as SplitType)}
              >
                <option value="EQUAL">Equal</option>
                <option value="PERCENTAGE">Percentage</option>
                <option value="FIXED">Fixed</option>
              </select>
            </div>

            {/* Dynamic Splits */}
            {splitType !== "EQUAL" &&
              members.map((m) => (
                <div key={m.id} className="form-group">
                  <span>{m.name}</span>
                  <input
                    type="number"
                    placeholder={splitType === "PERCENTAGE" ? "%" : "Amount"}
                    value={splitValues[m.id] || ""}
                    onChange={(e) =>
                      updateSplit(m.id, Number(e.target.value))
                    }
                  />
                </div>
              ))}

            <button
              className="button-primary"
              onClick={() => {
                const splits = members.map((m) => ({
                  userId: m.id,
                  type: splitType,
                  value:
                    splitType === "EQUAL"
                      ? 0
                      : splitType === "FIXED"
                        ? splitValues[m.id] || 0
                        : splitValues[m.id] || 0 // PERCENTAGE
                }));

                addExpense(
                  Number(amount), // rupees 
                  paidBy,
                  splitType,
                  splits
                );

                setAmount("");
                setPaidBy("");
                setSplitValues({});
              }}
            >
              Add Expense
            </button>
          </>
        )}
      </div>

      {/* Balances Section */}
      <div className="card">
        <h2>Balances</h2>

        {balancesLoading && <p>Loading balances...</p>}

        {!balancesLoading && balances.length === 0 && (
          <p className="muted">All balances are settled </p>
        )}

        <ul className="list">
          {balances.map((b, index) => {
            const from = members.find(m => m.id === b.fromUserId);
            const to = members.find(m => m.id === b.toUserId);

            return (
              <li key={index} className="list-item">
                <strong>{from?.name}</strong>
                <span>
                  owes <strong>{to?.name}</strong>
                </span>
                <span>₹ {(b.amount / 100).toFixed(2)}</span>
              </li>
            );
          })}
        </ul>
      </div>


      {/* Settlements Section */}
      <div className="card">
        <h2>Settlements</h2>

        <div className="form-group">
          <select value={fromUser} onChange={(e) => setFromUser(e.target.value)}>
            <option value="">From</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>

          <select value={toUser} onChange={(e) => setToUser(e.target.value)}>
            <option value="">To</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Amount"
            value={settleAmount}
            onChange={(e) => setSettleAmount(e.target.value)}
          />
        </div>

        <button
          className="button-primary"
          onClick={() => {
            recordSettlement(
              fromUser,
              toUser,
              Number(settleAmount)
            );
            setSettleAmount("");
          }}
        >
          Settle
        </button>

        {settlements.length === 0 ? (
          <p className="muted">No settlements recorded yet</p>
        ) : (
          <ul className="list">
            {settlements.map((s) => {
              const from = members.find(m => m.id === s.fromUserId);
              const to = members.find(m => m.id === s.toUserId);

              return (
                <li key={s.id} className="list-item">
                  <span>
                    <strong>{from?.name}</strong> paid <strong>{to?.name}</strong>
                  </span>
                  <span>₹ {(s.amount / 100).toFixed(2)}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default GroupDetails
