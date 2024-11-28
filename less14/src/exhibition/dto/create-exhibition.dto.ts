import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import {IsFile} from "../../utils/file-validator.decorator";

export class CreateExhibitionDto {
    @ApiProperty({ example: 'A beautiful painting', description: 'Опис експоната' })
    @IsString()
    @IsNotEmpty()
    @MinLength(4, { message: 'має бути не менше 4 символів' })
    description: string;

    @ApiProperty({ type: 'string', format: 'binary', description: 'Файл зображення' })
    @IsFile({ message: 'Файл має бути формату .jpeg або .png' })
    image: any;
}
