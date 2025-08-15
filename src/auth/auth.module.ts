import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/jwt-strategy/jwt-strategy';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';

@Module({
   imports: [
        PassportModule,
        JwtModule.register({
      secret: 'clave_super_segura',
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {
   
}
