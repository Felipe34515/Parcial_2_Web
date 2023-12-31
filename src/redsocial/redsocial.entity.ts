import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany , JoinTable} from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Entity()
export class RedsocialEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;
    
    @Column()
    slogan: string;

    @OneToMany(() => UsuarioEntity, usuario => usuario.redsocial)
     usuarios: UsuarioEntity[];

}
