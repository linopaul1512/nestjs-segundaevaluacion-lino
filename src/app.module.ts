import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';
import { UsersModule } from './users/users.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { LoggerService } from './logger/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
 imports: [UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'inventario',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // solo en desarrollo
    }),
    LoggerModule,
    AuthModule,
    UsersModule,
    UsuariosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



