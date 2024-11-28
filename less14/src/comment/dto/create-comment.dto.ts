import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString, MinLength} from "class-validator";

export class CreateCommentDto {
    @ApiProperty({ example: 'Це мій коментар!', description: 'Текст коментаря' })
    @IsString()
    @IsNotEmpty()
    @MinLength(4, { message: 'має бути не менше 4 символів' })
    text: string;
}
