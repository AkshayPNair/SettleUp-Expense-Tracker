import { sequelize } from "./sequelize";

import "./models/UserModel";
import "./models/GroupModel";
import "./models/ExpenseModel";
import "./models/ExpenseSplitModel";
import "./models/SettlementModel";

import "./models/associations";

export const initDb = async () => {
  await sequelize.authenticate()
  await sequelize.sync()
  console.log("Database connected")
}
