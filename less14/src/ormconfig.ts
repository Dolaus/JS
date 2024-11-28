import { DataSource } from 'typeorm';
import {User} from "./user/user.entity";
import {Exhibition} from "./exhibition/exhibition.entity";
import { Comment } from './comment/comment.entity';

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1212',
    database: 'shedulers',
    entities: [User, Exhibition, Comment],
    migrations: ['dist/migrations/*.js'],
    synchronize: false,
});
