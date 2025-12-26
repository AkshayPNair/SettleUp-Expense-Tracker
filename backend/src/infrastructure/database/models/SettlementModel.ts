import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../sequelize";
import { GroupModel } from "./GroupModel";
import { UserModel } from "./UserModel";

interface SettlementAttributes {
    id: string;
    amount: number;
    GroupId: string;
    fromUserId: string;
    toUserId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface SettlementCreationAttributes extends Optional<SettlementAttributes, "id"> { }

export class SettlementModel extends Model<SettlementAttributes, SettlementCreationAttributes> implements SettlementAttributes {
    public id!: string;
    public amount!: number;
    public GroupId!: string;
    public fromUserId!: string;
    public toUserId!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

SettlementModel.init(
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
        fromUserId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        toUserId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "Settlements"
    }
)

SettlementModel.belongsTo(GroupModel, {
    foreignKey: "GroupId"
})

SettlementModel.belongsTo(UserModel, {
    foreignKey: "fromUserId",
    as: "fromUser"
})

SettlementModel.belongsTo(UserModel, {
    foreignKey: "toUserId",
    as: "toUser"
})
