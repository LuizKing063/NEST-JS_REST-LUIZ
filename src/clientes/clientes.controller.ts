import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { ClientesService } from "./clientes.service";
import { CreateCLientesDto } from "./dto/clientes.create.dto";
import { UpdateClientesDto } from "./dto/clientes.update.dto";

@Controller('clientes')
export class ClientesController {

    constructor(private clientesService: ClientesService,) { }

    @Post()
    create(@Body() cliente:
        CreateCLientesDto) {

        return this.clientesService.create(cliente);
    }

    @UseGuards(AuthGuard)
    @Get()
    read() {
        return this.clientesService.list();
    }

    @Get(':id_cliente')
    show(@Param('id_cliente') id_cliente){

        return this.clientesService.get(id_cliente);
    }

    @Put(':id_cliente')
    update(@Param('id_cliente') id_cliente, @Body() cliente: UpdateClientesDto) {

        return this.clientesService.update(id_cliente, cliente);
    }

    @Patch(':id_cliente')
    patch(@Param('id_cliente') id_cliente, @Body() cliente: UpdateClientesDto) {
        return this.clientesService.update(id_cliente, cliente);
    } 

    @Delete(':id_cliente')
    delete(@Param('id_cliente') id_cliente) {
        
        return this.clientesService.delete(id_cliente);
    }

}