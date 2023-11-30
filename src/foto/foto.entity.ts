import { Column, Entity, PrimaryGeneratedColumn, OneToMany,ManyToOne,  ManyToMany , JoinTable} from 'typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { AlbumEntity } from 'src/album/album.entity';
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

    @OneToMany(()=> UsuarioEntity, usuario => usuario.foto)
    usuarios: UsuarioEntity[]

    @ManyToOne(() => AlbumEntity, album => album.fotos)
    album: AlbumEntity;
}
