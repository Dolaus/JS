import { DataSource } from 'typeorm';
import {User} from "./user/user.entity";
import {Exhibition} from "./exhibition/exhibition.entity";
import { Comment } from './comment/comment.entity';

export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '1212',
    database: process.env.DB_DATABASE || 'shedulers',
    entities: [User, Exhibition, Comment],
    migrations: ['dist/migrations/*.js'],
    synchronize: false,
});
