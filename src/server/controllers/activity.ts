import { Request, Response } from "express";
import { Activity } from "../../models/activity";


export const createActivity = async (req: Request, res: Response): Promise<void> => {
    const { email, title } = req.body;

    // Check Empty
    if(!email) res.status(400).json({ message: "Email cannot be Empty." });
    if(!title) res.status(400).json({ message: "Please insert activity title." });

    // Validate Email
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if(!emailPattern.test(email)) {
        res.status(400).json({ message: "Invalid Email." });
        return;
    }

    const act = await Activity.create({ email, title }, { returning: true });
    res.status(201).json({ status: "Success", message: "Success", data: act });
}

export const getAllActivities = async (req: Request, res: Response): Promise<void> => {
    const act = await Activity.findAll();
    res.status(200).json({ status: "Success", message: "Success", data: act });
}

export const getActivityById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const act = await Activity.findByPk(id);
    if(!act) {
        res.status(404).json({ status: "Not Found", message: `Activity with ID ${id} Not Found`});
        return;
    }

    res.status(200).json({ status: "Success", message: "Success", data: act });
}

export const updateActivity = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { email, title } = req.body;

    if(email) {
        // Validate Email
        const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if(!emailPattern.test(email)) {
            res.status(400).json({ message: "Invalid Email." });
            return;
        }
    }

    const actExist = await Activity.findByPk(id);
    if(!actExist) {
        res.status(404).json({ status: "Not Found", message: `Activity with ID ${id} Not Found` });
        return;
    }

    const act = await Activity.update({ email, title }, { where: { id }}).then(() => (Activity.findByPk(id)));
    res.status(200).json({ status: "Success", message: "Success", data: act });
}

export const deleteActivity = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    
    const actExist = await Activity.findByPk(id);
    if(!actExist) {
        res.status(404).json({ status: "Not Found", message: `Activity with ID ${id} Not Found` });
        return;
    }

    await Activity.destroy({ where: { id }});
    res.status(200).json({ status: "Success", message: `Activity with ID ${id} Deleted` });
}