import * as http from "http";
import { initDb } from "../lib";
import { initApp } from "./app";



(async () => {
    try {
        const { app, config } = await initApp();
        await initDb(config);
        const server: http.Server = http.createServer(app);
        server.listen(config.port);
        

        console.log(`Connected to Database.`);
        console.log(`Server running on port ${config.port}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})();