import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import {User} from "./user/user.entity";
import { AuthModule } from './auth/auth.module';
import { ExhibitionModule } from './exhibition/exhibition.module';
import {Exhibition} from "./exhibition/exhibition.entity";
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/comment.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '1212',
    database: process.env.DB_DATABASE || 'shedulers',
    entities: [User, Exhibition, Comment],
    synchronize: false,
  }), UserModule, AuthModule, ExhibitionModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
