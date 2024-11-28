import {Body, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {UserCreateDto} from "../user/dto/user-create.dto";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {User} from "../user/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private jwtService: JwtService) {
    }

    async login(userDto: UserCreateDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user);
    }

    async logout(userDto: UserCreateDto) {

    }

    async generateToken(user: User) {
        const payload = {username: user.username, id: user.id, isAdmin: user.isAdmin}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: UserCreateDto) {
        const user = await this.userService.findByUsername(userDto.username);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некоректні дані'})
    }
}
