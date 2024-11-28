import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import {UserService} from "./user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  exports: [UserService]
})
export class UserModule {}
