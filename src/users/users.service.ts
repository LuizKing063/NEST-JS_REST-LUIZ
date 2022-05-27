import { BadRequestException, Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { CreateUsersDto } from './dto/create-users.dto';
import * as bcrypt from "bcrypt";


@Injectable()
export class UsersService {

    constructor(private db: DataBaseService) { }

    async getByEmail(email: string) {

        const user = await this.db.users.findFirst({
            where: {
                email,
            },
            include: {
                funcionarios: true
            }
        });

        return user;
    }

    async create({email,password,fk_users_funcionarios}: CreateUsersDto) {

        const salt = bcrypt.genSaltSync(10);

        return this.db.users.create({
            data: {
                email,
                password: bcrypt.hashSync(password, salt),
                funcionarios: {
                    connect: {
                        id_funcionario: Number(fk_users_funcionarios),
                    },
                }
            }
        });
    }


    async update() {
    }

    async delete(id_users: number) {
    
        return this.db.users.delete({
            where: {
                id_user: this.getId(id_users)
            }
        })

    }

    getId(id_users: number) {
        id_users = Number(id_users);

        if (isNaN(id_users)) {
            throw new BadRequestException('Id inválido.')
        }

        return id_users;
    }
}
