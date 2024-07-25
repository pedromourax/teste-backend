import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginAuthAdministradorDto } from './dtos/login-administrador.dto';
// import { Administrador } from 'src/auth/interfaces/administrador.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthAdministradorDto } from './dtos/register-administrador.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdministradorEntity } from './interfaces/administrador.entity';
import { Repository } from 'typeorm';
import { enviroment } from 'src/enviroment';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        @InjectRepository(AdministradorEntity) private readonly administradorRepository: Repository<AdministradorEntity>
        // @InjectModel('Administrador') private readonly administradorRepository: Model<Administrador>
    ){}

    private logger = new Logger(AuthService.name)

    async valdiateUser(input: LoginAuthAdministradorDto){
        try {
            const { usuario, senha } = input
            const administrador = await this.administradorRepository.createQueryBuilder('administrador')
            .where("administrador.usuario = :usuario", { usuario }).getOne()
            if (!administrador){
                throw new UnauthorizedException('Usuário ou senha inválidos')
            }
            
            const senhaDescriptografada = bcrypt.compareSync(`${senha}`, `${administrador.senha}`)
            if (usuario != administrador.usuario || !senhaDescriptografada){
                throw new UnauthorizedException('Usuário ou senha inválidos')
            }

            return this.generateUserToken(administrador.id)

        } catch (error) {
            this.logger.error(`Error: ${JSON.stringify(error.message)}`)
            throw new UnauthorizedException(error.message)
        }
    }

    // async refreshTokens(refreshToken: string){
    //     try {
    //         const token = await this.refresTokenModel.findOne({
    //             token: refreshToken, 
    //             expiryDate: { $gte: new Date() }
    //         })
    //         if (!token) throw new UnauthorizedException("Token Inválido")
    //         return await this.generateUserToken(token.usuarioId)
    //     } catch (error) {
    //         this.logger.error(`Error: ${JSON.stringify(error.message)}`)
    //         throw new UnauthorizedException(error.message)
    //     }
    // }

    async generateUserToken(usuarioId){
        const access_token = this.jwtService.sign({usuarioId})
        // await this.storeRefreshToken(refresh_token, usuarioId)
        return {
            access_token,
        }
    }


    async registerUser(criarAdministrador: RegisterAuthAdministradorDto) {
        try {
            const { usuario, senha } = criarAdministrador
            const hash = await bcrypt.hash(`${senha}`, 10)
            return this.administradorRepository.save({usuario, senha: hash})

            // const admin = {
            //     timestamp: new Date().toISOString(),
            //     message: 'Administrador criado com sucesso',
            //     data: {
            //         usuario,
            //         _id: novoAdministrador._id 
            //     }
            // }
        } catch (error) {
            this.logger.error(`Error: ${JSON.stringify(error.message)}`)
            throw new BadRequestException(error.message)
        }
    }
    // async storeRefreshToken(token: string, usuarioId) {
    //     const expiryDate = new Date()
    //     expiryDate.setDate(expiryDate.getDate() + 1)

    //     await this.refresTokenModel.updateOne({ usuarioId }, {$set: {expiryDate, token} }, { upsert: true })
    // }
    async validarJwt(token: string) {
        try {
            return await this.jwtService.verifyAsync(token, {secret: enviroment.secret})
        } catch (error) {
            this.logger.error(`Error: ${JSON.stringify(error.message)}`)
            throw new BadRequestException(error.message)
        }
    }    
}
