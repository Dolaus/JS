import {BadRequestError, Body, Controller, Delete, Get, HttpError, Params, Patch, Post} from 'routing-controllers';
import * as fs from "fs";
import {IUser} from "../interface/IUser";
import 'reflect-metadata';
import {ValidateArgs} from "../decorators/validateDecorator";

@Controller('/users')
export class UserController {

    private PATH_TO_FILE = './files/users.json';

    @Get('/')
    getAuthor() {
        if (!fs.existsSync(this.PATH_TO_FILE)) {
            throw new HttpError(400, 'File not exist');
        }
        const data = fs.readFileSync(this.PATH_TO_FILE, {encoding: 'utf-8'});

        return {data: data}
    }

    @Post('/')
    @ValidateArgs(['user', 'email'])
    addNewUser(@Body() body: IUser) {
        console.log(body);
        return
        if (!fs.existsSync(this.PATH_TO_FILE)) {
            fs.writeFileSync(this.PATH_TO_FILE, JSON.stringify([]));
        }

        const users: IUser[] = JSON.parse(fs.readFileSync(this.PATH_TO_FILE, {encoding: 'utf-8'}));
        const lastId = users.sort((u1: IUser, u2: IUser) => u1.id - u2.id).at(-1)?.id || 0;

        const newUser = {id: lastId + 1, user: body.user, email: body.email};

        users.push(newUser);

        fs.writeFileSync(this.PATH_TO_FILE, JSON.stringify(users));

        return {message: "Create successfully"}
    }

    @Patch('/:id')
    @ValidateArgs(['user', 'email'])
    updateUser(@Body() body: IUser, @Params() params: { id: string }) {
        if (!fs.existsSync(this.PATH_TO_FILE)) {
            throw new HttpError(400, 'File not exist');
        }
        const users = JSON.parse(fs.readFileSync(this.PATH_TO_FILE, {encoding: 'utf-8'}));

        const user = users.find((u: IUser) => u.id === +params.id);
        if (!user) {
            throw new HttpError(400, 'User not found');
        }
        user.user = body.user;
        user.email = body.email;

        fs.writeFileSync(this.PATH_TO_FILE, JSON.stringify(users));

        return {message: "Updated successfully"}
    }

    @Delete('/:id')
    deleteUser(@Params() params: { id: string }) {
        if (!fs.existsSync(this.PATH_TO_FILE)) {
            throw new HttpError(400, 'File not exist');
        }

        const users = JSON.parse(fs.readFileSync(this.PATH_TO_FILE, {encoding: 'utf-8'}))
            .filter((u: IUser) => u.id !== +params?.id);

        fs.writeFileSync(this.PATH_TO_FILE, JSON.stringify(users));

        return {message: 'Deleted successfully'};
    }
}