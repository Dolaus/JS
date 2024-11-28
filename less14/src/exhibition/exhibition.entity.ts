import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';

@Entity('exhibitions')
export class Exhibition {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image: string;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.exhibitions, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => Comment, (comment) => comment.exhibition, { cascade: true })
    comments: Comment[];
}
