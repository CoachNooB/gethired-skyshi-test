import { Config, sequelize } from "../lib";
import { DataTypes } from "sequelize";
import { Todo } from "./todo";


const config = new Config();
const seq = sequelize(config)

export const Activity = seq.define("activities", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at"
});

// Activity.hasMany(Todo, {
//     foreignKey: {
//         name: "activity_group_id",
//         allowNull: false
//     },
//     onDelete: "CASCADE",
//     onUpdate: "CASCADE"
// });
Activity.sync();