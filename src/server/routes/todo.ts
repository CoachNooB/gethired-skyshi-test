import { IRouter, Router } from "express";
import * as asyncHandler from "express-async-handler";
import { createTodo, deleteTodo, getAllTodo, getTodoById, updateTodo } from "../controllers";


export const todoRoute: IRouter = Router();

// GET
todoRoute.get("/todo-items", asyncHandler(getAllTodo));
todoRoute.get("/todo-items/:id", asyncHandler(getTodoById));

// POST
todoRoute.post("/todo-items", asyncHandler(createTodo));

// PATCH
todoRoute.patch("/todo-items/:id", asyncHandler(updateTodo));

// DELETE
todoRoute.delete("/todo-items/:id", asyncHandler(deleteTodo));