import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChefsModule } from './chefs/chefs.module';
import { ClientesModule } from './clientes/clientes.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [FuncionariosModule, ChefsModule, ClientesModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule {}
