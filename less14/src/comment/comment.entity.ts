import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Exhibition } from '../exhibition/exhibition.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'Унікальний ідентифікатор коментаря' })
    id: number;

    @Column()
    @ApiProperty({ example: 'Це прекрасний експонат!', description: 'Текст коментаря' })
    text: string;

    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
    @ApiProperty({ description: 'Користувач, який залишив коментар' })
    user: User;

    @ManyToOne(() => Exhibition, (exhibition) => exhibition.comments, { onDelete: 'CASCADE' })
    @ApiProperty({ description: 'Експонат, до якого залишено коментар' })
    exhibition: Exhibition;
}
