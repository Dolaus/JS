import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Exhibition } from '../exhibition/exhibition.entity';
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Exhibition]), AuthModule],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
