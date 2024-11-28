import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {Exhibition} from "../exhibition/exhibition.entity";
import { Comment } from '../comment/comment.entity';

@Entity('users')
export class User {
    @Expose()
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор пользователя' })
    id: number;

    @Expose()
    @Column({ unique: true })
    @ApiProperty({ example: 'username123', description: 'Уникальное имя пользователя' })
    username: string;

    @Column()
    @ApiProperty({ example: 'hashedPassword', description: 'Хешированный пароль пользователя' })
    password: string;

    @OneToMany(() => Exhibition, (exhibition) => exhibition.user, { cascade: true })
    @ApiProperty({
        type: () => [Exhibition],
        description: 'Список экспонатов, добавленных пользователем',
    })
    exhibitions: Exhibition[];

    @Column({ default: false })
    isAdmin: boolean;

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];
}
