import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { LoggerModule } from 'src/logger/logger.module';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [UsuariosService],
  imports: [LoggerModule],
  controllers: [UsuariosController]
})
export class UsuariosModule {}
