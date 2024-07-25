import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GrupoEntity } from './grupos.entity';
import { Repository } from 'typeorm';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as XLSX from 'xlsx'
import * as fs from 'fs'

@Injectable()
export class GruposService {

  constructor(
    @InjectRepository(GrupoEntity) 
    private readonly GrupoRepository: Repository<GrupoEntity>,
    private usuariosService: UsuariosService
  ) {}

  private logger = new Logger(GruposService.name)

  async criarGrupo(nome: string) {
    return await this.GrupoRepository.save({nome})
  }
  // reload

  async adicionarUsuarios(grupoId: number, usuarios: any) {
    const usuariosToUpdate = await this.usuariosService.criarUsuarios(usuarios, grupoId)

    // await this.GrupoRepository
    // .createQueryBuilder('grupos')
    // .update(usuarios)
    // .set({usuarios: usuariosToUpdate })
  }

  async consultarGrupos(){
    try {
      return await this.GrupoRepository.find()
    } catch (error) {
      this.logger.error(`Error: ${JSON.stringify(error.message)}`)
      throw new BadRequestException(error.message)
    }
  }

  async consultarGrupoId(grupoId: number){
    try {
      const grupo = await this.GrupoRepository.findOne({where: {id: grupoId} })
      const usuarios = await this.usuariosService.consultarUsuariosPorGrupo(grupoId)
      return {
        grupo,
        usuarios
      }
    } catch (error) {
      this.logger.error(`Error: ${JSON.stringify(error.message)}`)
      throw new BadRequestException(error.message)
    }
  }

  async uploadFile(file: any, grupoId: number){
    try {
      const extension = file.originalname.split('.');
        if (extension[extension.length - 1] == 'xlsx') {
          await fs.writeFileSync('src/files/output.xlsx', file.buffer);
          const workBook = await XLSX.readFile('src/files/output.xlsx');
          await XLSX.writeFile(workBook, 'src/files/output.csv', { bookType: "csv", compression: true, cellStyles: true });
          const data = await fs.readFileSync('src/files/output.csv', "utf-8");
          const usuarios = data.split(',').map((item) => {
              const aux = item.replaceAll('\n', ",").split(',');
              return [...aux];
          });
          const usuariosFlat = usuarios.flatMap(subArray => subArray);
          console.log(usuariosFlat)
          let arr = [];
          for (let i = 0; i < usuariosFlat.length; i += 2) {
              const usuario = {
                  nome: usuariosFlat[i],
                  contato: usuariosFlat[i + 1]
              };
              arr.push(usuario);
          }
          return await this.usuariosService.criarUsuarios(arr, grupoId);
        }
        else {
          await fs.writeFileSync('src/files/output.csv', file.buffer);
          const data = await fs.readFileSync('src/files/output.csv', "utf-8");
          const usuarios = data.split(',').map((item) => {
              const aux = item.replaceAll('\r\n', ",").split(',');
              return [...aux];
          });
          const usuariosFlat = usuarios.flatMap(subArray => subArray);
          let arr = [];
          for (let i = 0; i < usuariosFlat.length; i += 2) {
              const usuario = {
                  nome: usuariosFlat[i],
                  contato: usuariosFlat[i + 1]
              };
              arr.push(usuario);
          }
          return await this.usuariosService.criarUsuarios(arr, grupoId);
        }
  }
  catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
  }
  }

}
