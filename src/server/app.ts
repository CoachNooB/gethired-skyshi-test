import "dotenv/config";
import * as express from "express";
import { Config } from "../lib";
import { activityRoute, todoRoute } from "./routes";

export const initApp = async (): Promise<{ app: express.Application, config: Config }> => {
    const config = new Config();
    const app = express();

    // Body Parser
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Middleware

    // Routes
    app.use(activityRoute);
    app.use(todoRoute);


    return { app, config }
}