import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async findByUsername(username: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { username } });
    }

    async findById(id: number): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { id } });
    }

    async create(username: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 3);

        const existingUser = await this.usersRepository.findOne({
            where: { username },
        });
console.log(4)
        if (existingUser) {
            throw new BadRequestException('User exits');
        }
        console.log(hashedPassword)

        const user = this.usersRepository.create({
            username,
            password: hashedPassword,
        });

        return this.usersRepository.save(user);
    }
}
