import { ContatoEntity } from "src/contatos/contatos.entity"
import { GrupoEntity } from "src/grupos/grupos.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm"

@Entity('usuarios')
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string
    
    @ManyToOne(() => GrupoEntity, grupo => grupo.usuarios)
    grupo: GrupoEntity

    @OneToOne(() => ContatoEntity)
    @JoinColumn()
    contato: ContatoEntity

}