import {IsString, IsNotEmpty, MinLength} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UserCreateDto {
    @ApiProperty({example: 'user1', description: 'логін'})
    @IsString()
    @IsNotEmpty()
    @MinLength(4, {message: 'Ім’я користувача має бути не менше 4 символів'})
    username: string;

    @ApiProperty({example: 'password1', description: 'Пароль'})
    @IsString()
    @IsNotEmpty()
    @MinLength(6, {message: 'Пароль має бути не менше 6 символів'})
    password: string;
}
