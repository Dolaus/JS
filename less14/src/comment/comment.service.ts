import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from '../user/user.entity';
import { Exhibition } from '../exhibition/exhibition.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        @InjectRepository(Exhibition)
        private readonly exhibitionRepository: Repository<Exhibition>,
    ) {}

    async createComment(user: User, exhibitionId: number, text: string): Promise<Comment> {
        const exhibition = await this.exhibitionRepository.findOne({ where: { id: exhibitionId } });
        if (!exhibition) {
            throw new Error('Експонат не знайдено');
        }

        const comment = this.commentRepository.create({
            text,
            user,
            exhibition,
        });

        return this.commentRepository.save(comment);
    }

    async getCommentsForExhibition(exhibitionId: number): Promise<Comment[]> {
        return this.commentRepository.find({
            where: { exhibition: { id: exhibitionId } },
            relations: ['user'],
        });
    }

    async deleteComment(commentId: number, userId: number): Promise<boolean> {
        const comment = await this.commentRepository.findOne({ where: { id: commentId, user: { id: userId } } });
        if (!comment) {
            throw new Error('Коментар не знайдено або не належить користувачу');
        }
        await this.commentRepository.remove(comment);
        return true;
    }
}
