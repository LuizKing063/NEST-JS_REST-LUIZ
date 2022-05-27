import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { DataBaseModule } from "src/database/database.module";
import { FuncionariosController } from './funcionarios.controller'
import { FuncionariosService } from "./funcionarios.service";

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
  controllers: [FuncionariosController],
  providers: [FuncionariosService],
})

export class FuncionariosModule { }