import { Body, Controller, Post } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @Post()
    async createUser(@Body() Body: CreateUsersDto) {
        return this.userService.create(Body);
    }

}
