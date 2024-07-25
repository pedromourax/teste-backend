import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { CriarGrupoDto } from './dto/criar-grupo.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard)
@Controller('api/v1/grupos')
export class GruposController {
  constructor(private readonly gruposService: GruposService) {}

  @Post('criar')
  async criarGrupo(@Body() input: CriarGrupoDto){
    return await this.gruposService.criarGrupo(input.nome)
  }

  @Put('adicionar')
  async adicionarUsuarios(@Body() input: any){
    return await this.gruposService.adicionarUsuarios(input.grupoId, input.usuarios)
  }

  @Get()
  async consultarGrupos(){
    return await this.gruposService.consultarGrupos()
  }

  @Get("grupo/:id")
  async consultarGruposId(@Param('id') id: string){
    return await this.gruposService.consultarGrupoId(Number(id))
  }

  @Post('file/:grupoId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('grupoId') grupoId: string
  ) {
    // console.log(file)
    return await this.gruposService.uploadFile(file, Number(grupoId));
  }
 
}
