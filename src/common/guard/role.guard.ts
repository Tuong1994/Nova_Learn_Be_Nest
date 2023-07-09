import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole } from 'common/enum/student';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<ERole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    const isMatch = requireRoles.some((role) => user.role === role);

    if (isMatch) return true;

    throw new ForbiddenException('You not authorize for this action');
  }
}
