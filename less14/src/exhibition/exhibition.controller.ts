import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    UploadedFile, Req, UseGuards, Get, NotFoundException, Param, Delete, Res,
} from '@nestjs/common';
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {Exhibition} from './exhibition.entity';
import {CreateExhibitionDto} from './dto/create-exhibition.dto';
import {ExhibitionService} from './exhibition.service';
import {extname} from 'path';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import * as fs from "fs";
import {ExhibitionGateway} from "./exhibition.gateway";

@ApiTags('Виставка')
@Controller('exhibitions')
export class ExhibitionController {
    constructor(
        private readonly exhibitionService: ExhibitionService,
        private readonly exhibitionGateway: ExhibitionGateway,
    ) {
    }

    @Get()
    @ApiOperation({summary: 'Перегляд усіх експонатів'})
    @ApiResponse({status: 200, description: 'Список усіх експонатів'})
    async getAll() {
        return this.exhibitionService.findAll();
    }


    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: 'Створення нового експоната'})
    @ApiResponse({status: 201, description: 'Експонат успішно створений'})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                image: {type: 'string', format: 'binary'},
                description: {type: 'string'},
            },
        },
    })
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './files',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    callback(null, `${uniqueSuffix}${ext}`);
                },
            }),
        }),
    )
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createExhibitionDto: CreateExhibitionDto,
        @Req() req: any,
    ): Promise<Exhibition> {
        const user = req.user;
        console.log(user);
        const post = await this.exhibitionService.create(createExhibitionDto, file.filename, user);

        this.exhibitionGateway.notifyNewPost(user.id, post);

        return post;
    }


    @Get('static/:filename')
    @ApiOperation({summary: 'Отримання статичного файлу'})
    @ApiResponse({status: 200, description: 'Файл успішно отримано'})
    async getStaticFile(@Param('filename') filename: string, @Res() res: any) {
        const filePath = `./files/${filename}`;
        if (!fs.existsSync(filePath)) {
            throw new NotFoundException('Файл не знайдено');
        }
        res.sendFile(filePath, {root: '.'});
    }

    @Get('post/:id')
    @ApiOperation({summary: 'Перегляд експоната за ID'})
    @ApiResponse({status: 200, description: 'Експонат знайдено'})
    @ApiResponse({status: 404, description: 'Експонат не знайдено'})
    async getById(@Param('id') id: number) {
        const exhibit = await this.exhibitionService.findById(id);
        if (!exhibit) {
            throw new NotFoundException('Експонат не знайдено');
        }
        return exhibit;
    }

    @UseGuards(JwtAuthGuard)
    @Get('my-posts')
    @ApiOperation({summary: 'Перегляд експонатів поточного користувача'})
    @ApiBearerAuth('access-token')
    async getMyPosts(@Req() req: any) {
        const user = req.user;
        return this.exhibitionService.findByUser(user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({summary: 'Видалення експоната поточного користувача за ID'})
    @ApiBearerAuth('access-token')
    @ApiResponse({status: 200, description: 'Експонат видалено'})
    @ApiResponse({status: 404, description: 'Експонат не знайдено або не належить користувачу'})
    async delete(@Param('id') id: number, @Req() req: any) {
        const user = req.user;
        const result = await this.exhibitionService.deleteById(id, user.id);
        if (!result) {
            throw new NotFoundException('Експонат не знайдено або не належить користувачу');
        }
        return {message: 'Експонат видалено'};
    }
}
