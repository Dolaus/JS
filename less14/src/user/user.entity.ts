import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// import { Exhibit } from '../exhibits/exhibit.entity';
// import { Comment } from '../comments/comment.entity';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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

    // @OneToMany(() => Exhibit, (exhibit) => exhibit.user, { cascade: true })
    // @ApiProperty({
    //     type: () => [Exhibit],
    //     description: 'Список экспонатов, добавленных пользователем',
    // })
    // exhibits: Exhibit[];

    @Column({ default: false })
    isAdmin: boolean;

    // @OneToMany(() => Comment, (comment) => comment.user)
    // comments: Comment[];
}
