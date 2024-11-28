import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString, MinLength} from "class-validator";

export class CreateExhibitionDto {
    @ApiProperty({ example: 'A beautiful painting', description: 'Опис експоната' })
    @IsString()
    @IsNotEmpty()
    @MinLength(4, { message: 'має бути не менше 4 символів' })
    description: string;
}
