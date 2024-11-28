import { Controller, Post, Get, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {CreateCommentDto} from "./dto/create-comment.dto";

@ApiTags('Comments')
@Controller('exhibits/:exhibitId/comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Додати коментар до експоната' })
    @ApiResponse({ status: 201, description: 'Коментар успішно додано' })
    async createComment(
        @Param('exhibitId') exhibitId: number,
        @Body() createCommentDto: CreateCommentDto,
        @Req() req: any,
    ) {
        console.log(123123)
        const user = req.user;
        const { text } = createCommentDto;
        return this.commentService.createComment(user, exhibitId, text);
    }

    @Get()
    @ApiOperation({ summary: 'Отримати всі коментарі до експоната' })
    @ApiResponse({ status: 200, description: 'Коментарі успішно отримано' })
    async getComments(@Param('exhibitId') exhibitId: number) {
        return this.commentService.getCommentsForExhibition(exhibitId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':commentId')
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Видалити коментар' })
    @ApiResponse({ status: 200, description: 'Коментар успішно видалено' })
    async deleteComment(@Param('commentId') commentId: number, @Req() req: any) {
        const user = req.user;
        await this.commentService.deleteComment(commentId, user.id);
        return { message: 'Коментар успішно видалено' };
    }
}
