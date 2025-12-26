import { DataTypes, Model, Optional, BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin } from "sequelize";
import { sequelize } from "../sequelize";
import { UserModel } from "./UserModel";

interface GroupAttributes {
    id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface GroupCreationAttributes extends Optional<GroupAttributes, "id"> { }

export class GroupModel extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
    public id!: string;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public members!: UserModel[]

    public addMember!: BelongsToManyAddAssociationMixin<UserModel, string>;

    public getMembers!: BelongsToManyGetAssociationsMixin<UserModel>;
}

GroupModel.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "Groups"
    }
)
