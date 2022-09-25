import { Config, sequelize } from "../lib";
import { DataTypes } from "sequelize";
import { Activity } from "./activity";


const config = new Config();
const seq = sequelize(config);
export const Todo = seq.define("todo", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    activity_group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "very-high"
    }
}, {
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at"
})

//Todo.belongsTo(Activity, { as: 'Activity', foreignKey: "activity_group_id" });
Todo.sync();