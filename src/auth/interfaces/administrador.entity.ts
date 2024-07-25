import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"

@Entity('administrador')
export class AdministradorEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true})
    usuario: string

    @Column()
    senha: string
}