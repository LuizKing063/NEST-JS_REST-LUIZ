import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { DataBaseService } from 'src/database/database.service';
import { CreateFuncionariosDto } from './dto/funcionarios.create.dto';
import { UpdateFuncionariosDto } from './dto/funcionarios.update.dto';


@Injectable()
export class FuncionariosService {

    constructor(private db: DataBaseService) { }

    validate(data: CreateFuncionariosDto) {

        if (!data.Nome) {
            throw new BadRequestException('O campo Nome é Obrigatório.');
        }
        if (!data.funcao) {
            throw new BadRequestException('O campo Função é Obrigatório.');
        }
        if (!data.Salario) {
            throw new BadRequestException('O campo Salário é Obriga.');
        }
        if (!data.CPF) {
            throw new BadRequestException('O campo CPF é obrigatório.');
        }
        if (!data.fk_restaurante_funcionarios) {
            throw new BadRequestException('O campo fk_restaurante_funcionarios é obrigatório.')
        }

        return data;
    }
    
    
    validateUpdate(data: CreateFuncionariosDto) {

        if (!data.Nome) {
            throw new BadRequestException('O campo Nome é Obrigatório.');
        }
        if (!data.funcao) {
            throw new BadRequestException('O campo Função é Obrigatório.');
        }
        if (!data.Salario) {
            throw new BadRequestException('O campo Salário é Obriga.');
        }
        if (!data.CPF) {
            throw new BadRequestException('O campo CPF é obrigatório.');
        }

        return data;
    }


    async create(data: CreateFuncionariosDto) {

        this.validate(data);

        return this.db.funcionarios.create({
            data: {
                Nome: data.Nome,
                funcao_funcaoTofuncionarios: {
                    connect: {
                        id_funcao: +data.funcao
                    }
                },
                Salario: data.Salario,
                CPF: data.CPF,
                restaurante: {
                    connect: {
                        id_restaurante: +data.fk_restaurante_funcionarios
                    }
                }
            }
        });
    }

    async list() {

        return this.db.funcionarios.findMany();
    }

    async get(id_funcionario: number) {
        const funcionariosGet = await this.db.funcionarios.findUnique({
            where: {
                id_funcionario: this.getId(id_funcionario)
            }
        });

        if (!funcionariosGet) {
            throw new NotFoundException('Funcionário inexistente.');
        }

        return funcionariosGet
    }

    update(id_funcionario: number, data: UpdateFuncionariosDto) {

        this.validateUpdate(data);

        return this.db.funcionarios.update({
            where: {
                id_funcionario: this.getId(id_funcionario)
            },
            data,
        });


    }

    async delete(id_funcionario: number) {
        await this.get(id_funcionario);

        return this.db.funcionarios.delete({
            where: {
                id_funcionario: this.getId(id_funcionario)
            }
        });

    }

    getId(id_funcionario: number) {

        id_funcionario = Number(id_funcionario);

        if (isNaN(id_funcionario)) {
            throw new BadRequestException('Id inválido.');
        }

        return id_funcionario;
    }
}