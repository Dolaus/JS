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
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1212',
    database: 'shedulers',
    entities: [User, Exhibition, Comment],
    synchronize: false,
  }), UserModule, AuthModule, ExhibitionModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
