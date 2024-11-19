import {useExpressServer} from "routing-controllers";
import {UserController} from "./controller/UserController";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

dotenv.config()

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

useExpressServer(app, {
    controllers: [UserController]
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
