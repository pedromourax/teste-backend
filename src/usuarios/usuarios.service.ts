import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuarios.entity';
import { Repository } from 'typeorm';
import { ContatoEntity } from 'src/contatos/contatos.entity';
import { ContatosService } from 'src/contatos/contatos.service';

@Injectable()
export class UsuariosService {

    constructor(
        @InjectRepository(UsuarioEntity) 
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        private contatosService: ContatosService,
    ) {}

    private logger = new Logger(UsuariosService.name)


    // array de obj com => [{ nome, contato }]
    async criarUsuarios(usuarios: any, grupoId: number) {
        try {
            let result = []
            for (let usuario of usuarios){

                usuario.contato = await this.contatosService.criarContato(usuario.contato)
                usuario.grupo = grupoId
                console.log(usuario)
                if(usuario.contato) {
                    await this.usuarioRepository.save(usuario)
                    result.push(usuario)
                }
            }

            return result
        } catch (error) {
            this.logger.error(`Error: ${JSON.stringify(error.message)}`)
            throw new BadRequestException(error.message)
        }
        
    }

    
    async consultarUsuariosPorGrupo(grupoId: number){
        try {
            return await this.usuarioRepository.find({where: {grupo: {id: grupoId} }, relations: {contato: true, grupo: true }})            
        } catch (error) {
            this.logger.error(`Error: ${JSON.stringify(error.message)}`)
            throw new BadRequestException(error.message)
        }
    }

}
