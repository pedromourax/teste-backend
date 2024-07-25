import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuarios.entity';
import { ContatosModule } from 'src/contatos/contatos.module';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports: [TypeOrmModule.forFeature([UsuarioEntity]), ContatosModule],
  exports: [UsuariosService]
})
export class UsuariosModule {}
