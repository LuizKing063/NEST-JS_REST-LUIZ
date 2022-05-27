import { Controller, Body, Post } from '@nestjs/common';
import { CreateUsersDto } from 'src/users/dto/create-users.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private userService: UsersService
        ) { }

    @Post('register')
    async createUser(@Body() Body: CreateUsersDto) {
        return this.userService.create(Body);
    }

    @Post('login')
    async login(@Body() Body: LoginDto) {
        return this.authService.login(Body);
    }
}
