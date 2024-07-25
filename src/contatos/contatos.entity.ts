import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, OneToOne } from "typeorm"

@Entity('contatos')
export class ContatoEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true})
    telefone: string

}