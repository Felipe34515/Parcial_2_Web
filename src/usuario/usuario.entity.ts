import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, ManyToMany , JoinTable} from 'typeorm';
import { FotoEntity } from 'src/foto/foto.entity';
import { RedsocialEntity } from 'src/redsocial/redsocial.entity';

export class UsuarioEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;
    
    @Column()
    telefono: string;//int

    @ManyToOne(() => FotoEntity, foto => foto.usuarios)
    foto: FotoEntity;

    @ManyToOne(() => RedsocialEntity, redsocial => redsocial.usuarios)
    redsocial: RedsocialEntity;
}
