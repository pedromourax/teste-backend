import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if(!token) throw new UnauthorizedException("Token Inválido")
    try {
      const payload = this.jwtService.verify(token)
      request.usuarioId = payload.usuarioId
      
    } catch (error) {
      Logger.error(error.message)
      throw new UnauthorizedException("Token Inválido")
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    return request.headers.authorization?.split(' ')[1]
  }
}
