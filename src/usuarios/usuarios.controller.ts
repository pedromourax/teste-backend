import { Body, Controller, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('api/v1/usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('criar')
  async criarUsuario(@Body() input: any ) {
    console.log(input.input)
    return await this.usuariosService.criarUsuarios(input.input, input.grupoId)
  }

}
