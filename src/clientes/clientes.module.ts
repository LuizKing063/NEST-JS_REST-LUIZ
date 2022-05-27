import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { DataBaseModule } from "src/database/database.module";
import { ClientesController } from "./clientes.controller";
import { ClientesService } from "./clientes.service";


@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: `${process.env.JWT_EXPIRES_IN}s`,
        },
      }),
    }),
    DataBaseModule
  ],
  controllers: [ClientesController],
  providers: [ClientesService],
})

export class ClientesModule { }