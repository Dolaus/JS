import { DataSource } from 'typeorm';
import {User} from "./user/user.entity";

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1212',
    database: 'shedulers',
    entities: [User],
    migrations: ['dist/migrations/*.js'],
    synchronize: false,
});
