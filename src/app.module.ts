import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';
import { UsersModule } from './users/users.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { LoggerService } from './logger/logger.service';

@Module({
  imports: [AuthModule, LoggerModule, UsuariosModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
