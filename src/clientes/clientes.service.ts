import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { NotFoundError } from "rxjs";
import { DataBaseService } from "src/database/database.service";
import { CreateCLientesDto } from "./dto/clientes.create.dto";
import { UpdateClientesDto } from "./dto/clientes.update.dto";






@Injectable()
export class ClientesService {
    constructor(private db: DataBaseService) { }

    validate(data:CreateCLientesDto) {

        if (!data.Nome) {
            throw new BadRequestException('O campo Nome é obrigatório.')
        }
        if (!data.Telefone) {
            throw new BadRequestException('O campo Telefone é obrigatório.')
        }
        if (!data.fk_restaurante_cliente) {
            throw new BadRequestException('O campo fk_restaurante_cliente')
        }

        return data;
    }

    validateUpdate(data:CreateCLientesDto) {

        if (!data.Nome) {
            throw new BadRequestException('O campo Nome é obrigatório.')
        }
        if (!data.Telefone) {
            throw new BadRequestException('O campo Telefone é obrigatório.')
        }

        return data;
    }

    async create(data: CreateCLientesDto) {

        this.validate(data);

        return this.db.clientes.create({
            data: {
                Nome_cliente: data.Nome,
                Telefone_cliente: data.Telefone,
                restaurante: {
                    connect: {
                        id_restaurante: +data.fk_restaurante_cliente
                    }
                }
            }
        });
    }

    async list() {
        return this.db.clientes.findMany();
    }

    async get(id_cliente: number) {
        const clientesGet = await this.db.clientes.findUnique({
            where: {
                id_cliente: this.getId(id_cliente)
            }
        });
         
        if (!clientesGet) {
            throw new NotFoundException('Cliente incexistente.')
        }

        return clientesGet
    }

    update(id_cliente: number, data: UpdateClientesDto) {
        this.validateUpdate(data);

        return this.db.clientes.update({
            where: {
                id_cliente: this.getId(id_cliente)
            },
            data: {
                Nome_cliente: data.Nome,
                Telefone_cliente: data.Telefone
            }
        });
    }

    async delete(id_cliente: number) {
        await this.get(id_cliente);

        return this.db.clientes.delete({
            where: {
                id_cliente: this.getId(id_cliente)
            }
        });
    }
    getId(id_cliente: number) {
        id_cliente = Number(id_cliente);

        if (isNaN(id_cliente)) {
            throw new BadRequestException('Id inválido.')
        }

        return id_cliente;
    }
}
