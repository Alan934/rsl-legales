
import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { error } from 'console';

  
  @Injectable()
  export class AuthGuard implements CanActivate {

    constructor(
        private readonly client: AuthService
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {

      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('Token not found');
      }
      try {

        const { user, token:newToken } = await this.client.verifyToken(token);

        request['user'] = user;

        request['token'] = newToken;

      } catch(error) {
        throw new HttpException({
          status: HttpStatus.UNAUTHORIZED,
          error: `Invalid Token/Expired Token`,
        }, HttpStatus.UNAUTHORIZED, {
          cause: error
        });
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  