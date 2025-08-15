import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
     log(mensaje:string ){
    console.log(`[LOG]: ${mensaje}`);
  }
}



