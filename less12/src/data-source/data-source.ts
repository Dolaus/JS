import "reflect-metadata";
import { DataSource } from "typeorm";
import {User} from "../entity/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "1212",
    database: process.env.DB_DATABASE || "shedulers",
    synchronize: true,
    logging: true,
    entities: [User]
});