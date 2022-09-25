import { IRouter, Router } from "express";
import * as asyncHandler from "express-async-handler";
import { createActivity, deleteActivity, getActivityById, getAllActivities, updateActivity } from "../controllers";


export const activityRoute: IRouter = Router();

// GET
activityRoute.get("/activity-groups", asyncHandler(getAllActivities));
activityRoute.get("/activity-groups/:id", asyncHandler(getActivityById));

// POST
activityRoute.post("/activity-groups", asyncHandler(createActivity));

// PATCH
activityRoute.patch("/activity-groups/:id", asyncHandler(updateActivity));

// DELETE
activityRoute.delete("/activity-groups/:id", asyncHandler(deleteActivity));