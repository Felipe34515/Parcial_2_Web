import { UsuarioEntity } from '../usuario/usuario.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany , JoinTable, ManyToOne} from 'typeorm';
import { FotoEntity } from '../foto/foto.entity';


@Entity()
export class AlbumEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fechaInicio: Date;

    @Column()
    fechaFin: Date;

    @Column()
    título: string;


// {
  @OneToMany(() => FotoEntity, foto => foto.album)  
     fotos: FotoEntity[];

    // @ManyToMany(() => PerformerEntity, performer => performer.albums)
    // @JoinTable()
    // performers: PerformerEntity[];
 
   

}