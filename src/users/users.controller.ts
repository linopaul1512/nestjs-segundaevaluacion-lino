import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  // 🟢 Listar todos los usuarios
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.Admin)
@Get()
  async findAll() {
    return await this.UsersService.findAll();
  }

  // 🔍 Buscar usuario por ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.UsersService.findById(id);
  }

  // 📧 Buscar usuario por email (opcional, si se expone)
  // @Get('email/:email')
  // async findByEmail(@Param('email') email: string) {
  //   return await this.UsersService.findByEmail(email);
  // }

  // 📝 Crear nuevo usuario
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.UsersService.createUser(dto);
  }

  // ✏️ Actualizar usuario
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return await this.UsersService.updateUser(id, dto);
  }

  // 🗑️ Eliminar usuario
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.UsersService.deleteUser(id);
  }
}
