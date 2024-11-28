import { ApiProperty } from '@nestjs/swagger';

export class CreateExhibitionDto {
    @ApiProperty({ example: 'A beautiful painting', description: 'Опис експоната' })
    description: string;
}
