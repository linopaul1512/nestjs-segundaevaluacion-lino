import{ Injectable, CanActivate, ExecutionContext} from'@nestjs/common';
import{ Reflector } from'@nestjs/core';
import{ Role } from'./roles.enum'; // Enumcon los roles definidos

@Injectable()
export  class RolesGuard implements CanActivate{
constructor(private reflector: Reflector) {}
canActivate(context: ExecutionContext): boolean{
    // 1. Obtener los roles requeridos desde el decorador @Roles
        const requiredRoles= this.reflector.get<Role[]>('roles', context.getHandler());
        if(!requiredRoles|| requiredRoles.length=== 0) {
        return true; // Si no hay roles definidos, se permite el acceso
    }
    // 2. Obtener el usuario desde la petición HTTP
    const request= context.switchToHttp().getRequest();
    const user= request.user;
    console.log('Usuario autenticado:', user);

    
    // 3. Verificar si el usuario tiene alguno de los roles requeridos
    // return user?.roles?.some((role: Role) => requiredRoles.includes(role));

    return requiredRoles.includes(user?.role); // Comparación directa con string
}
}
