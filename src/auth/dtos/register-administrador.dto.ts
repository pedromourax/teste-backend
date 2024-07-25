import { IsNotEmpty } from "class-validator"


export class RegisterAuthAdministradorDto {

    @IsNotEmpty()
    usuario: string
    
    @IsNotEmpty()
    senha: string
}