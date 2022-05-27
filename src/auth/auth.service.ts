import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async login({
        email,
        password,
    }: LoginDto) {

        // Verificando se existe um usuário com o email informado
        const user = await this.usersService.getByEmail(email)

        if (!user) {
            throw new BadRequestException('Usuário ou senha inválido.');
        }

        // Verificando se a senha está correta
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            throw new BadRequestException('Usuário ou senha inválido.');
        }

        const acessToken = this.jwtService.sign({
            id: user.id_user,
            email: user.email,
            name: user.funcionarios.Nome,
        });

        delete user.password;

        return {
            user,
            acessToken,
        };
    }

}
