import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DataBaseService } from "src/database/database.service";
import { AuthType } from "./auth.type";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private database: DataBaseService,
        private jwtService: JwtService
        ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
         
        const request = context.switchToHttp().getRequest();

        console.log(request.headers);

        const Authorization = request.headers['authorization'];

        if(!Authorization) {
            throw new UnauthorizedException('Autorização não informada.')
        }

        try {

            const token = Authorization.split(' ')[1];

            this.jwtService.verify(token);

            const data = this.jwtService.decode(token) as AuthType;

            const user = this.database.users.findUnique({
                where: {
                    id_user: +data.id
                }
            });

            if(!user) {
                throw new UnauthorizedException('Usuário não encontrado.')
            }
    
            return true;

        } catch (e) {
            throw new UnauthorizedException(e.message);
        }
    }

}