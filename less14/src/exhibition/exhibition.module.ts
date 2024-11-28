import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exhibition } from './exhibition.entity';
import { ExhibitionService } from './exhibition.service';
import { ExhibitionController } from './exhibition.controller';
import {AuthModule} from "../auth/auth.module";
import {ExhibitionGateway} from "./exhibition.gateway";

@Module({
  imports: [TypeOrmModule.forFeature([Exhibition]), AuthModule],
  controllers: [ExhibitionController],
  providers: [ExhibitionService, ExhibitionGateway],
})
export class ExhibitionModule {}
