import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { DataBaseService } from "src/database/database.service";
import { CreateChefsDto } from "./dto/chefs.create.dto";
import { UpdateChefsDto } from "./dto/chefs.update.dto";




@Injectable()
export class ChefsService{

    constructor(private db: DataBaseService) { }

    validate(data: CreateChefsDto) {
        if (!data.Salario) {
            throw new BadRequestException('O campo Salário é obrigatório.');
        }
        if (!data.fk_funcionario_chef) {
            throw new BadRequestException('O campo fk_funcionario_chef é obrigatório.');
        }
    }

    validateUpdate(data: CreateChefsDto) {
        if (!data.Salario) {
            throw new BadRequestException('O campo Salário é obrigatório.');
        }
    }


    async create(data: CreateChefsDto) {
        this.validate(data);

        return this.db.chefs.create({
            data: {
                Salario: data.Salario,
                funcionarios: {
                    connect: {
                        id_funcionario: +data.fk_funcionario_chef
                    }
                }
            }
        });
    }

    async list() {

        return this.db.chefs.findMany();
    }

    async get(id_chef: number) {

        const ChefsGet = await this.db.chefs.findUnique({
            where: {
                id_chef: this.getId(id_chef)
            }
        });

        if (!ChefsGet) {
            throw new NotFoundException('Chef inexistente.');
        }
        
        return ChefsGet
    }

    update(id_chef: number, data: UpdateChefsDto) {
        this.validateUpdate(data);

        return this.db.chefs.update({
            where: {
                id_chef: this.getId(id_chef)
            },
            data,
        });
    }

    async delete(id_chef: number) {
        await this.get(id_chef);

        return this.db.chefs.delete({
            where: {
                id_chef: this.getId(id_chef)
            }
        })
    }

    getId(id_chef: number) {
        id_chef = Number(id_chef);

        if(isNaN(id_chef)) {
            throw new BadRequestException('Id inválido.')
        }

        return id_chef;
    }
}