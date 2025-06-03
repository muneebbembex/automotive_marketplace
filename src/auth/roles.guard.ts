import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { JwtRequestUser } from 'src/common/types/jwt-request-user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    // Define a custom request type that includes the user property
    const request = context
      .switchToHttp()
      .getRequest<{ user?: JwtRequestUser }>();
    const user = request.user;

    // Check if user exists and has a role
    if (!user || !user.role) {
      return false;
    }

    return requiredRoles.includes(user.role);
  }
}