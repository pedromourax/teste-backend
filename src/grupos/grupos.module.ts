import { Module } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { GruposController } from './grupos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoEntity } from './grupos.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  controllers: [GruposController],
  providers: [GruposService],
  imports: [TypeOrmModule.forFeature([GrupoEntity]), UsuariosModule]
})
export class GruposModule {}
