import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private  jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {console.log(12312312312)

        const req = context.switchToHttp().getRequest();

        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
console.log(authHeader)
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Не авторизований'})
            }

            req.user = this.jwtService.verify(token);
            return true;

        } catch (e) {
            console.log(e)
            throw new UnauthorizedException({message: 'Не авторизований'})
        }
    }

}