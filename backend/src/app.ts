import express from "express";
import cors from "cors";

import groupRoutes from "./interfaces/routes/group.routes";
import expenseRoutes from "./interfaces/routes/expense.routes";
import settlementRoutes from "./interfaces/routes/settlement.routes";
import reportRoutes from "./interfaces/routes/report.routes";
import userRoutes from './interfaces/routes/user.routes'
import { errorHandler } from "./interfaces/middleware/errorHandler";

const app = express()

app.use(
    cors({
        origin: [
            "http://localhost:5173",      
            "https://settleup.akshaypnair.space"
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: false
    })
)
app.use(express.json())

app.use("/api/users", userRoutes)
app.use("/api/groups", groupRoutes)
app.use("/api/expenses", expenseRoutes)
app.use("/api/settlements", settlementRoutes)
app.use("/api/reports", reportRoutes)

app.use(errorHandler)

app.get("/", (_req, res) => {
    res.send('SettleUp API is Running')
})

export default app
