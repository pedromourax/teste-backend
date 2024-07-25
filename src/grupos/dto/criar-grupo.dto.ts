import { IsString } from "class-validator";

export class CriarGrupoDto {
    
    @IsString()
    nome: string

}
