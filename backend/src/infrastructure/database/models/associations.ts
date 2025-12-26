import { GroupModel } from "./GroupModel";
import { UserModel } from "./UserModel";
import { ExpenseModel } from "./ExpenseModel";
import { ExpenseSplitModel } from "./ExpenseSplitModel";

//Many-to-Many: Group - User
GroupModel.belongsToMany(UserModel, {
    through: "GroupMembers",
    as: "members"
});

UserModel.belongsToMany(GroupModel, {
    through: "GroupMembers",
    as: "groups"
});

// Expense relations
ExpenseModel.belongsTo(GroupModel, {
    foreignKey: "GroupId"
});

ExpenseModel.belongsTo(UserModel, {
    foreignKey: "paidByUserId",
    as: "paidByUser"
});

ExpenseModel.hasMany(ExpenseSplitModel, {
    foreignKey: "ExpenseId",
    as: "splits"
});

// ExpenseSplit relations
ExpenseSplitModel.belongsTo(ExpenseModel, {
    foreignKey: "ExpenseId"
});

ExpenseSplitModel.belongsTo(UserModel, {
    foreignKey: "UserId"
});
