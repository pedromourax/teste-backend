import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContatoEntity } from './contatos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContatosService {

    constructor(
        @InjectRepository(ContatoEntity) 
        private readonly contatoRepository: Repository<ContatoEntity>
    ) {}

    private logger = new Logger(ContatosService.name)

    async criarContato(telefone: string){
        const TelefoneExiste = await this.contatoRepository.findOneBy({telefone})
        if (TelefoneExiste) return null
        return await this.contatoRepository.save({telefone})
    }

    

}
