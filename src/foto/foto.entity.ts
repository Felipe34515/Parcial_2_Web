import { Column, Entity, PrimaryGeneratedColumn, OneToMany,ManyToOne,  ManyToMany , JoinTable} from 'typeorm';
import { AlbumEntity } from '../album/album.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Entity()
export class FotoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    ISO: number;//int
    
    @Column()
    velObturacion: number;//int

    @Column()
    apertura: number;//int

    @Column()
    fecha: Date;


    @ManyToOne(() => AlbumEntity, album => album.fotos)
    album: AlbumEntity;

    @ManyToOne(()=> UsuarioEntity, usuario=> usuario.fotos)
    usuario: UsuarioEntity;
}
