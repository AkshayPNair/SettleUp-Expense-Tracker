import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../sequelize";
import type { ExpenseSplitModel } from "./ExpenseSplitModel";

interface ExpenseAttributes {
    id: string;
    amount: number;
    GroupId: string;
    paidByUserId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ExpenseCreationAttributes extends Optional<ExpenseAttributes, "id"> { }

export class ExpenseModel extends Model<ExpenseAttributes, ExpenseCreationAttributes> implements ExpenseAttributes {
    public id!: string;
    public amount!: number;
    public GroupId!: string;
    public paidByUserId!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public splits!: ExpenseSplitModel[];
}

ExpenseModel.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        amount: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        GroupId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        paidByUserId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "Expenses"
    }
)

