import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ContatosModule } from './contatos/contatos.module';
import { GruposModule } from './grupos/grupos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database-1.cnqyu2gm8pgh.sa-east-1.rds.amazonaws.com',
      port: 5432,
      username: 'testetecnico',
      password: 'supermegavendas',
      database: 'teste_tecnico',
      synchronize: true,
      logging: true,
      entities: ["dist/**/**/*.entity{.ts,.js}"],
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
    }
  }
    }),
    AuthModule,
    JwtModule.register({ secret: 'chave-secreta', signOptions: { expiresIn: '8h' }, global: true}),
    UsuariosModule,
    ContatosModule,
    GruposModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
