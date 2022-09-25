import { Activity } from "./activity";
import { Todo } from "./todo";


Activity.hasMany(Todo, {
    foreignKey: {
        name: "activity_group_id",
        allowNull: false
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Todo.belongsTo(Activity, { as: 'Activity', foreignKey: "activity_group_id" });