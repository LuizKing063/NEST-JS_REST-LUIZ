import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { ChefsService } from "./chefs.service";
import { CreateChefsDto } from "./dto/chefs.create.dto";
import { UpdateChefsDto } from "./dto/chefs.update.dto";




@Controller('chefs')
export class ChefsController {
    constructor(private chefsService:
        ChefsService,) { }

    @Post()
    create(@Body() chef:
    CreateChefsDto) {
        return this.chefsService.create (chef);
    }

    @Get()
    read() {
        return this.chefsService.list();
    }

    @Get(':id_chef')
    show(@Param('id_chef') id_chef) {
        return this.chefsService.get(id_chef);
    }

    @Put(':id_chef')
    update(@Param('id_chef') id_chef, @Body() chef: UpdateChefsDto) {
        return this.chefsService.update(id_chef,chef);
    }

    @Patch(':id_chef')
    patch(@Param('id_chef') id_chef, @Body() chef: UpdateChefsDto) {
        return this.chefsService.update(id_chef, chef);
    }

    @Delete('id_chef')
    delete(@Param('id_chef') id_chef) {
        return this.chefsService.delete(id_chef);
    }
}