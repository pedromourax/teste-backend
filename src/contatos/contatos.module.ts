import { Module } from '@nestjs/common';
import { ContatosService } from './contatos.service';
import { ContatosController } from './contatos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContatoEntity } from './contatos.entity';

@Module({
  controllers: [ContatosController],
  providers: [ContatosService],
  imports: [TypeOrmModule.forFeature([ContatoEntity])],
  exports: [ContatosService]
})
export class ContatosModule {}
