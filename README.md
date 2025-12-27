# 💰 SettleUp – Expense Splitter (Group Finance System)

SettleUp is a full-stack **Expense Splitter application** that allows groups to track shared expenses, calculate balances accurately, record settlements, and export reports.

The system is designed with a strong focus on **financial correctness, clean architecture, proper validation, and real-world accounting behavior**, similar to applications like Splitwise.

---

## 🚀 Deployment Overview

- **Backend**: Node.js + Express (hosted on AWS EC2)
- **Frontend**: React + TypeScript (hosted on Vercel)
- **Database**: MySQL with Sequelize ORM

---

## ✨ Core Features

### 👤 User Management
- Create users
- List users (ordered by **latest created first**)
- Case-insensitive name validation
- UUID-based identifiers

---

### 👥 Group Management
- Create groups
- Add multiple members to groups
- Prevent duplicate group names
- Prevent adding the same user multiple times
- Groups listed by **latest created first**

---

### 💸 Expense Management
- Add expenses to groups
- Supports **three split types**:
  - **Equal**
  - **Percentage**
  - **Fixed amount**
- Strong validations:
  - Minimum **2 members required** to add an expense
  - Payer must belong to the group
  - Percentage splits must total **100%**
  - Fixed and Equal splits must exactly match total expense amount
  - Mixed split types are **not allowed**
- Duplicate or invalid expense entries are prevented

---

### ⚖️ Automatic Balance Calculation
- Calculates net balances for each group
- Determines **who owes whom**
- Efficient algorithm suitable for larger groups
- Balances update automatically after:
  - Adding expenses
  - Recording settlements

---

### 🤝 Settlement Tracking
- Record settlements between group members
- Validations:
  - No self-settlement
  - No settlement when no balance exists
  - Cannot settle more than the outstanding balance
- Settlement history is preserved
- Latest settlements are shown first

---

### 📊 Report Export
- Export **Expense Reports** (CSV)
- Export **Settlement Reports** (CSV)
- Reports include:
  - User names instead of IDs
  - Amounts in rupees
  - Timestamps
- CSV format suitable for auditing or accounting

---

## 🧠 Architecture & Design

### Clean Architecture
The backend strictly follows **Clean Architecture** principles:
##Backend

```text
backend/
└── src/
    ├── application/
    │   ├── error/
    │   ├── mappers/
    │   └── use-cases/
    │       ├── expense/
    │       ├── group/
    │       ├── report/
    │       ├── settlement/
    │       └── user/
    ├── config/
    ├── domain/
    │   ├── dtos/
    │   ├── entities/
    │   └── interfaces/
    │       ├── repositories/
    │       └── services/
    ├── infrastructure/
    │   ├── database/
    │   │   ├── models/
    │   │   └── repositories/
    │   └── services/
    ├── interfaces/
    │   ├── controllers/
    │   ├── middleware/
    │   └── routes/
    └── utils/
    ├── app.ts
    └── server.ts
```
**Design principles applied:**
- Business logic is framework-independent
- ORM logic stays inside repositories only
- Use-cases depend on interfaces, not implementations
- Clear separation of concerns
  
## Frontend - (React + TypeScript)

```text
frontend/
├── public/
└── src/
    ├── assets/
    ├── components/
    ├── hooks/
    ├── pages/
    └── services/
```
**Frontend design principles applied:**
- UI components are kept free of business logic
- All API interactions are handled via service files
- State management and side effects are encapsulated in custom hooks
- Strong TypeScript typing for predictable data flow
- Clear separation between pages, hooks, and services



**Design principles applied:**
- Business logic is framework-independent
- ORM logic stays inside repositories only
- Use-cases depend on interfaces, not implementations
- Clear separation of concerns

---

## 💰 Financial Accuracy & Rounding Safety

To avoid floating-point precision issues:

- All monetary values are stored and calculated in **paise (integers)**
- Utility helpers:
  - `toPaise(amount)`
  - `toRupee(paise)`
- Equal split rounding is handled safely
- Final split total is always validated against the original expense amount

This ensures **financial correctness**, even with decimal values.

---

## 🔁 Database Transactions (IMPORTANT)

### Where Transactions Are Used
Database transactions are used during **expense creation**, covering:
- Expense creation
- All related expense split records

These operations are wrapped inside **a single transaction**.

### Why Transactions Matter
Transactions ensure **atomicity**:
- Either the entire expense (with all splits) is saved
- Or nothing is saved if an error occurs

### Advantages
- Prevents partial or corrupted financial data
- Protects against server crashes mid-operation
- Ensures data consistency
- Mirrors real-world financial systems

---

## 🔐 Validation & Error Handling

- Centralized `AppError` handling
- Consistent HTTP status codes
- Clear error messages
- Prevents:
  - Invalid expenses
  - Duplicate members
  - Over-settlement
  - Mixed split logic
  - Incorrect totals

---

## 🖥️ Frontend Architecture

### Stack
- React + TypeScript
- Axios (centralized API client)
- Custom hooks per feature
- Toast notifications for UX feedback

### Pages
- Dashboard (Users)
- Groups
- Group Details
- Reports

### Pattern
Each feature follows:
- **Service** → API communication
- **Hook** → state, validation, side effects
- **Page** → UI only

This keeps the frontend clean and maintainable.

---

## 🌐 Environment Configuration

### Backend Environment (example)
```env
DB_NAME=settleup_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
PORT=4000
```

### Frontend Environment (example)
```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
```
⚠️ Environment files are excluded from version control for security reasons.

---

## 🚫 Why Delete Operations Are Not Included

User and Group deletion is intentionally **not implemented** in SettleUp.

### Reasoning:

- Deleting users or groups can break financial history  
- Financial systems must preserve audit trails  
- Prevents orphaned expenses and settlements  
- Ensures data integrity across balances and reports  

This design decision aligns with **real-world accounting and finance systems**, where historical records are immutable once financial transactions exist.

---

## 🏁 Final Notes

SettleUp is a **production-style expense splitter** built with:

- Financial safety  
- Clean Architecture  
- Real-world accounting constraints in mind  
- Accurate monetary calculations  
- Robust validation and error handling  
- Scalable balance computation  
- Clean separation of concerns  
- Transaction-safe database operations  

---

Built with correctness, clarity, and real-world finance principles at its core.


