import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthAdministradorDto } from './dtos/login-administrador.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RegisterAuthAdministradorDto } from './dtos/register-administrador.dto';

@Controller('api/v1/auth')
export class AuthController {

    constructor (private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginInput: LoginAuthAdministradorDto){
        return await this.authService.valdiateUser(loginInput)
    }

    @Get()
    @UseGuards(AuthGuard)
    async getHello(){
        return {msg: "Authorized, hello world"}
    }

    @Post('register')
    @UsePipes(ValidationPipe)
    async register(@Body() registerInput: RegisterAuthAdministradorDto) {
        return await this.authService.registerUser(registerInput)
    }

    @Post("jwt")
    async verificarJwt(@Body() input: any){
        return await this.authService.validarJwt(input.token)
    }
}
