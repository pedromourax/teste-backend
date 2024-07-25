import { UsuarioEntity } from "src/usuarios/usuarios.entity"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

@Entity('grupos')
export class GrupoEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true})
    nome: string

    @OneToMany(() => UsuarioEntity, usuarios => usuarios.grupo)
    usuarios: UsuarioEntity[]
}