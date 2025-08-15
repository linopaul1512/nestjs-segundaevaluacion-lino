import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(NotFoundException, BadRequestException)
export class UsersExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      estado: 'error',
      codigo: status,
      mensaje: exception.message,
      ruta: request.url,
      momento: new Date().toISOString(),
      modulo: 'users',
    });
  }
}
