import { IsNotEmpty } from "class-validator"


export class LoginAuthAdministradorDto {

    @IsNotEmpty()
    usuario: string
    
    @IsNotEmpty()
    senha: string
}