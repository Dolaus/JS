import "reflect-metadata";

import {
    BadRequestError,
    Body,
    Controller,
    Delete,
    Get,
    HttpError,
    Params,
    Patch,
    Post
} from 'routing-controllers';
import { User } from '../entity/User';
import { ValidateArgs } from '../decorators/validateDecorator';
import { AppDataSource } from '../data-source/data-source';

@Controller('/users')
export class UserController {
    private userRepository = AppDataSource.getRepository(User);

    @Get('/')
    async getUsers() {
        const users = await this.userRepository.find();
        return { data: users };
    }

    @Post('/')
    @ValidateArgs(['user', 'email'])
    async addNewUser(@Body() body: { user: string; email: string }) {
        const newUser = this.userRepository.create(body);
        await this.userRepository.save(newUser);

        return { message: 'User created successfully', data: newUser };
    }

    @Patch('/:id')
    @ValidateArgs(['user', 'email'])
    async updateUser(@Body() body: { user: string; email: string }, @Params() params: { id: string }) {
        const user = await this.userRepository.findOne({ where: { id: +params.id } });

        if (!user) {
            throw new HttpError(400, 'User not found');
        }

        user.user = body.user;
        user.email = body.email;

        await this.userRepository.save(user);

        return { message: 'User updated successfully', data: user };
    }

    @Delete('/:id')
    async deleteUser(@Params() params: { id: string }) {
        const user = await this.userRepository.findOne({ where: { id: +params.id } });

        if (!user) {
            throw new HttpError(400, 'User not found');
        }

        await this.userRepository.remove(user);

        return { message: 'User deleted successfully' };
    }
}
