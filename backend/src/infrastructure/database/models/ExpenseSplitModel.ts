import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../sequelize";

interface ExpenseSplitAttributes {
  id: string;
  ExpenseId: string;
  UserId: string;
  amount: number;
  type: "EQUAL" | "PERCENTAGE" | "FIXED";
}

interface ExpenseSplitCreationAttributes extends Optional<ExpenseSplitAttributes, "id"> {}

export class ExpenseSplitModel extends Model<ExpenseSplitAttributes, ExpenseSplitCreationAttributes> implements ExpenseSplitAttributes{
  public id!: string;
  public ExpenseId!: string;
  public UserId!: string;
  public amount!: number;
  public type!: "EQUAL" | "PERCENTAGE" | "FIXED";
}

ExpenseSplitModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    ExpenseId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM("EQUAL", "PERCENTAGE", "FIXED"),
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "ExpenseSplits"
  }
);

