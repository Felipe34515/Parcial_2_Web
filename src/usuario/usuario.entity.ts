import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, ManyToMany , JoinTable} from 'typeorm';
import { RedsocialEntity } from '../redsocial/redsocial.entity';
import { FotoEntity } from '../foto/foto.entity';

@Entity()
export class UsuarioEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;
    
    @Column()
    telefono: string;//int

     @ManyToOne(() => RedsocialEntity, redsocial => redsocial.usuarios)
    redsocial: RedsocialEntity;

    @OneToMany(()=> FotoEntity, foto => foto.usuario)
    fotos: FotoEntity[];

 
}
