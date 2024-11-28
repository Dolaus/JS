import {BadRequestException, Body, Controller, Get, NotFoundException, Post, Query} from '@nestjs/common';
import {UserService} from "./user.service";
import {ApiOperation, ApiQuery, ApiResponse} from "@nestjs/swagger";
import {plainToInstance} from "class-transformer";
import {User} from "./user.entity";
import {UserCreateDto} from "./dto/user-create.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Регистрация нового пользователя' })
    @ApiResponse({ status: 201, description: 'Пользователь успешно зарегистрирован' })
    @ApiResponse({ status: 400, description: 'Некорректные данные' })
    @Post('register')
    async register(@Body() createUserDto: UserCreateDto) {
        console.log(createUserDto);
        const user = await this.userService.create(
            createUserDto.username,
            createUserDto.password,
        );

        return plainToInstance(User, user, { excludeExtraneousValues: true });
    }

    @Get()
    @ApiOperation({ summary: 'Получить пользователя по ID или username' })
    @ApiQuery({ name: 'id', required: false, description: 'ID пользователя' })
    @ApiQuery({ name: 'username', required: false, description: 'Имя пользователя' })
    @ApiResponse({ status: 200, description: 'Пользователь найден' })
    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    async getUser(
        @Query('id') id?: number,
        @Query('username') username?: string,
    ) {
        if (id || username) {
            throw new NotFoundException('ID или username должны быть указаны!');
        }

        const user = id
            ? await this.userService.findById(id)
            : await this.userService.findByUsername(username);

        if (!user) {
            throw new NotFoundException('Пользователь не найден!');
        }

        return plainToInstance(User, user, { excludeExtraneousValues: true });
    }
}
