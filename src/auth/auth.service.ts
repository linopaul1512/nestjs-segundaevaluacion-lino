import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// Suponiendo que tienes un servicio de usuarios
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  // Validación de usuario
  async validateUser(loginDto: LoginDto): Promise<any> {
    const user = await this.userService.findByEmail(loginDto.email);
    console.log("Usuario buscado: ", user)
    const isPasswordValid = await bcrypt.compare(loginDto.password, user?.password);

    if (user && isPasswordValid) {
      return user;
    }

    throw new UnauthorizedException('Credenciales inválidas');
  }

  // Generación de token JWT
  async generateToken(user: any) {
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,  
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
