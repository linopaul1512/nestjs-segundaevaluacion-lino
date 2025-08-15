import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.userRepo.find();
    return users.map(({ password, ...rest }) => rest);
  }

  async findById(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    const { password, ...rest } = user;
    return rest;
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async createUser(dto: CreateUserDto) {
    const exists = await this.userRepo.findOneBy({ email: dto.email });
    if (exists) throw new ConflictException('El correo ya está registrado');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({
      ...dto,
      password: hashedPassword,
      role: dto.role || 'user',
    });

    const saved = await this.userRepo.save(user);
    const { password, ...rest } = saved;
    return rest;
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const updates: Partial<User> = { ...dto };

    if (dto.password) {
        updates.password = await bcrypt.hash(dto.password, 10);
    }

    await this.userRepo.update(id, updates);

    const updated = await this.userRepo.findOneBy({ id });
    if (!updated) throw new NotFoundException('Usuario actualizado no encontrado');

    const { password, ...rest } = updated;
    return rest;
}


  async deleteUser(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    await this.userRepo.delete(id);
    const { password, ...rest } = user;
    return rest;
  }
}
