import { Sequelize } from "sequelize";
import { createConnection } from "mysql2";
import { Config } from "../config";


export const initDb = async (config: Config) => {
    const { dbName, dbHost, dbPort, dbUser, dbPass } = config;
    const client = createConnection({
        host: dbHost,
        user: dbUser,
        password: dbPass,
        port: parseInt(dbPort),
    });
    await new Promise(resolve => client.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, async (err, res) => {
        // console.log(err, res);
        resolve(client.end());
    }));
}

// const config = new Config();
export const sequelize = (config: Config) => {
    initDb(config);
    return new Sequelize(config.dbName, config.dbUser, config.dbPass, { dialect: "mysql" });
} 