import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
    @ApiProperty({ example: 'Це мій коментар!', description: 'Текст коментаря' })
    text: string;
}
