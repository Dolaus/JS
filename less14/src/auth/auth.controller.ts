import {Body, Controller, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {UserCreateDto} from "../user/dto/user-create.dto";
import {AuthService} from "./auth.service";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Post('/login')
    login(@Body() userDto: UserCreateDto) {
        return this.authService.login(userDto);
    }

}
