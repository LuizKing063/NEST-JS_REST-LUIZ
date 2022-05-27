import { Module } from "@nestjs/common";
import { DataBaseModule } from "src/database/database.module";
import { ChefsController } from "./chefs.controller";
import { ChefsService } from "./chefs.service";


@Module ({
    imports: [DataBaseModule],
    controllers: [ChefsController],
    providers: [ChefsService],
})

export class ChefsModule {}