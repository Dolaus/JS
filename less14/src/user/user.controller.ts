import {
    BadRequestException,
    Body,
    Controller,
    Get,
    NotFoundException,
    Post,
    Query,
    UseGuards,
    Req
} from '@nestjs/common';
import {UserService} from "./user.service";
import {ApiOperation, ApiQuery, ApiResponse, ApiBearerAuth} from "@nestjs/swagger";
import {plainToInstance} from "class-transformer";
import {User} from "./user.entity";
import {UserCreateDto} from "./dto/user-create.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @ApiOperation({summary: 'Реєстрація нового користувача'})
    @ApiResponse({status: 201, description: 'Користувач успішно зареєстрований'})
    @ApiResponse({status: 400, description: 'Некоректні дані'})
    @Post('register')
    async register(@Body() createUserDto: UserCreateDto) {
        console.log(createUserDto);
        const user = await this.userService.create(
            createUserDto.username,
            createUserDto.password,
        );

        return plainToInstance(User, user, {excludeExtraneousValues: true});
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({summary: 'Отримати користувача за ID або username'})
    @ApiQuery({name: 'id', required: false, description: 'ID користувача'})
    @ApiQuery({name: 'username', required: false, description: 'Ім’я користувача'})
    @ApiResponse({status: 200, description: 'Користувач знайдений'})
    @ApiResponse({status: 404, description: 'Користувача не знайдено'})
    async getUser(
        @Query('id') id?: number,
        @Query('username') username?: string,
    ) {
        if (!id && !username) {
            throw new NotFoundException('ID або username мають бути вказані!');
        }

        const user = id
            ? await this.userService.findById(id)
            : await this.userService.findByUsername(username);

        if (!user) {
            throw new NotFoundException('Користувача не знайдено!');
        }

        return plainToInstance(User, user, {excludeExtraneousValues: true});
    }

    @UseGuards(JwtAuthGuard)
    @Get('my-profile')
    @ApiOperation({summary: 'Отримати інформацію про поточного користувача'})
    @ApiBearerAuth('access-token')
    @ApiResponse({status: 200, description: 'Інформація про користувача успішно отримана'})
    async getMyProfile(@Req() req: any) {
        const user = req.user;

        if (!user) {
            throw new NotFoundException('Користувача не знайдено!');
        }

        return plainToInstance(User, user, {excludeExtraneousValues: true});
    }
}
