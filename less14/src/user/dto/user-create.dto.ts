import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UserCreateDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4, { message: 'Ім’я користувача має бути не менше 4 символів' })
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Пароль має бути не менше 6 символів' })
    password: string;
}
