import { Request, Response } from "express";
import { Activity, Todo } from "../../models";



export const createTodo = async (req: Request, res: Response): Promise<void> => {
    const { activity_group_id, title, is_active, priority } = req.body;

    // Check Empty
    if(!title) res.status(400).json({ message: "Please insert title." });
    if(!activity_group_id) res.status(400).json({ message: "Activity Group ID cannot be empty" });

    // Check Exist
    const act = await Activity.findByPk(activity_group_id);
    if(!act) {
        res.status(404).json({
            status: "Not Found",
            message: `Activity Group with ID ${activity_group_id} Not Found`
        });
        return;
    }

    const todo = await Todo.create({ activity_group_id, title, is_active, priority }, { returning: true });
    res.status(201).json({ status: "Success", message: "Success", data: todo });
}

export const getAllTodo = async (req: Request, res: Response): Promise<void> => {
    const todos = await Todo.findAll();
    res.status(200).json({ status: "Success", message: "Success", data: todos });
}

export const getTodoById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const todo = await Todo.findByPk(id);
    if(!todo) {
        res.status(404).json({ status: "Not Found", message: `Todo with ID ${id} Not Found` });
        return;
    }
    res.status(200).json({ status: "Success", message: "Success", data: todo });
}

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { activity_group_id, title, is_active, priority } = req.body;

    // Check Exist
    const todoExist = await Todo.findByPk(id);
    if(!todoExist) {
        res.status(404).json({ status: "Not Found", message: `Todo with ID ${id} Not Found`})
    }
    const act = await Activity.findByPk(activity_group_id);
    if(!act) {
        res.status(404).json({
            status: "Not Found",
            message: `Activity Group with ID ${activity_group_id} Not Found`
        });
        return;
    }

    const todo = await Todo.update({ activity_group_id, title, is_active, priority }, { where: { id } }).then(() => Todo.findByPk(id));
    res.status(200).json({ status: "Success", message: "Success", data: todo });
}

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    
    const todoExist = await Todo.findByPk(id);
    if(!todoExist) {
        res.status(404).json({ status: "Not Found", message: `Todo with ID ${id} Not Found` });
        return;
    }

    await Todo.destroy({ where: { id } });
    res.status(200).json({ status: "Success", message: `Todo with ID ${id} Deleted` });
}