import { Body, Controller, Post } from '@nestjs/common';
import { ContatosService } from './contatos.service';

@Controller('api/v1/contatos')
export class ContatosController {
  constructor(private readonly contatosService: ContatosService) {}

  @Post('criar')
  async criarContato(@Body() input: any){
    return await this.contatosService.criarContato(input.telefone)
  }

}
