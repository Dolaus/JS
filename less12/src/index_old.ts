import express, {Request, Response} from "express";
import bodyParser from 'body-parser';
import fs from "fs";
import {IUser} from "./interface/IUser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;
const PATH_TO_FILE = './files/users.json';

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}))

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get('/', (_: Request, res: Response) => {
    res.send("Author Petro Stelmashchuk");
});

app.get('/users', (_: Request, res: Response) => {
    if (!fs.existsSync(PATH_TO_FILE)) {
        res.status(404).send({error: 'File not found'});
    }
    const users: IUser[] = JSON.parse(fs.readFileSync(PATH_TO_FILE, {encoding: 'utf-8'}));

    res.send(users);
});

app.post('/users', (req: Request, res: Response) => {
    if (!fs.existsSync(PATH_TO_FILE)) {
        fs.writeFileSync(PATH_TO_FILE, JSON.stringify([]));
    }

    const users: IUser[] = JSON.parse(fs.readFileSync(PATH_TO_FILE, {encoding: 'utf-8'}));
    const lastId = users.sort((u1: IUser, u2: IUser) => u1.id - u2.id).at(-1)?.id || 1;

    const newUser = {id: lastId + 1, user: req.body.user, email: req.body.email};

    users.push(newUser);

    fs.writeFileSync(PATH_TO_FILE, JSON.stringify(users));

    res.send(201);
});

app.patch('/users/:id', (req: Request, res: Response) => {
    if (!fs.existsSync(PATH_TO_FILE)) {
        res.status(404).send({error: 'File not found'});
    }
    const users = JSON.parse(fs.readFileSync(PATH_TO_FILE, {encoding: 'utf-8'}));

    const user = users.find((u: IUser) => u.id === +req.params?.id);
    if (!user) {
        res.send(404);
    }
    user.user = req.body.user;
    user.email = req.body.email;

    fs.writeFileSync(PATH_TO_FILE, JSON.stringify(users));

    res.send(201)
})

app.delete('/users/:id', (req: Request, res: Response) => {
    if (!fs.existsSync(PATH_TO_FILE)) {
        res.status(404).send({error: 'File not found'});
    }

    const users = JSON.parse(fs.readFileSync(PATH_TO_FILE, {encoding: 'utf-8'}))
        .filter((u: IUser) => u.id !== +req.params?.id);

    fs.writeFileSync(PATH_TO_FILE, JSON.stringify(users));

    res.send(202)
})