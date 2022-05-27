import { Controller, Post, Get, Put, Param, Patch, Delete, Body, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateFuncionariosDto } from './dto/funcionarios.create.dto';
import { UpdateFuncionariosDto } from './dto/funcionarios.update.dto';
import { FuncionariosService } from './funcionarios.service';

@Controller('funcionarios')
export class FuncionariosController {

    constructor(private funcionariosService: FuncionariosService,) { }

    @UseGuards(AuthGuard)

    @Post()
    create(@Body() funcionario: CreateFuncionariosDto) {

        return this.funcionariosService.create(funcionario);
    }

    @UseGuards(AuthGuard)
    @Get()
    read() {
        return this.funcionariosService.list(
        );
    }

    @Get(':id_funcionario')
    show(@Param('id_funcionario') id_funcionario) {
        return this.funcionariosService.get(id_funcionario);
    }

    @Put(':id_funcionario')
    update(@Param('id_funcionario') id_funcionario, @Body() funcionario: UpdateFuncionariosDto) {
        return this.funcionariosService.update(id_funcionario, funcionario);
    }

    @Patch(':id_funcionario')
    patch(@Param('id_funcionario') id_funcionario, @Body() funcionario: UpdateFuncionariosDto) {
        return this.funcionariosService.update(id_funcionario, funcionario);
    }

    @Delete(':id_funcionario')
    delete(@Param('id_funcionario') id_funcionario) {
        return this.funcionariosService.delete(id_funcionario);
    }
}