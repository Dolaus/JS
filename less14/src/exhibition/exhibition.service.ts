import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Exhibition } from './exhibition.entity';
import { CreateExhibitionDto } from './dto/create-exhibition.dto';
import { User } from '../user/user.entity';

@Injectable()
export class ExhibitionService {
    constructor(
        @InjectRepository(Exhibition)
        private readonly exhibitionRepository: Repository<Exhibition>,
    ) {}

    async create(
        createExhibitionDto: CreateExhibitionDto,
        filename: string,
        user: User,
    ): Promise<Exhibition> {
        const exhibition = this.exhibitionRepository.create({
            description: createExhibitionDto.description,
            image: filename,
            user,
        });

        return this.exhibitionRepository.save(exhibition);
    }

    async findAll(): Promise<Exhibition[]> {
        return this.exhibitionRepository.find({ relations: ['user'] });
    }

    async findById(id: number): Promise<Exhibition> {
        return this.exhibitionRepository.findOne({ where: { id }, relations: ['user'] });
    }

    async findByUser(userId: number): Promise<Exhibition[]> {
        return this.exhibitionRepository.find({ where: { user: { id: userId } }, relations: ['user'] });
    }

    async deleteById(id: number, userId: number): Promise<boolean> {
        const exhibit = await this.exhibitionRepository.findOne({ where: { id, user: { id: userId } } });
        if (!exhibit) {
            return false;
        }
        await this.exhibitionRepository.remove(exhibit);
        return true;
    }

    async findAllWithPagination(page: number, limit: number) {
        const offset = (page - 1) * limit;

        const [data, total] = await this.exhibitionRepository.findAndCount({
            relations: ['user', 'comments'],
            skip: offset,
            take: limit,
        });

        console.log(data);

        const formattedData = data.map((exhibition) => ({
            id: exhibition.id,
            imageUrl: `/static/${exhibition.image}`,
            description: exhibition.description,
            user: exhibition.user
                ? {
                    id: exhibition.user.id,
                    username: exhibition.user.username,
                }
                : null,
            commentCount: exhibition.comments.length,
        }));

        return {
            data: formattedData,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        };
    }

}
