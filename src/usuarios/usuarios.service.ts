import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class UsuariosService {

    constructor( private readonly logger: LoggerService){

    }

     private productos = [
    { id: 1, nombre: 'Teclado Mecánico', precio: 70 },
    { id: 2, nombre: 'Monitor LED', precio: 150 },
    { id: 3, nombre: 'Mouse Inalámbrico', precio: 40 },
    { id: 4, nombre: 'Mouse', precio: 40 },
  ];

 getUsuarios(){
            return this.productos
    }

    crearUsuario(nombre: string ){
            this.logger.log(`Usuario creado: ${nombre}`);
            return { mensaje: 'Usuario registrado', nombre}
        }
}
