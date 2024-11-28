import "reflect-metadata";
import dotenv from "dotenv";
import {AppDataSource} from "./data-source/data-source";
import {useExpressServer} from "routing-controllers";
import express from "express";
import bodyParser from "body-parser";
import {UserController} from "./controller/UserController";

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");

        useExpressServer(app, {
            controllers: [UserController],
        });

        const port = process.env.PORT || 3000;

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
