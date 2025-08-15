import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { UsuariosModule } from './usuarios.module';
import { UsuariosService } from './usuarios.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';

@Controller('usuarios')
export class UsuariosController {

    constructor(private readonly usuariosService: UsuariosService){
        
          //this.producService = new ProductosService()
        }

   @Get('all')
      getProduct(): any {
       //return this.productosService.getProductos()[2][0];
         return this.usuariosService.getUsuarios();
     } 

  @Get(":id")
  getProductById(@Param('id') id: string){
    const idNum = parseInt(id, 10);
    if(idNum <= 0)
        throw new NotFoundException(`Usuario con ID ${idNum} no encontrado`);
    return idNum
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Get()
  findAll(){
    return this.usuariosService.getUsuarios()
  }

}