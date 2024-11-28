import { IsString, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
