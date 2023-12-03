import {TypeOrmModule} from '@nestjs/typeorm';
import {AlbumEntity} from '../../album/album.entity';
import { FotoEntity } from 'src/foto/foto.entity';
import { RedsocialEntity } from 'src/redsocial/redsocial.entity';


export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [AlbumEntity, FotoEntity, RedsocialEntity],
        synchronize: true,
        keepConnectionAlive: true,
    }),
    TypeOrmModule.forFeature([AlbumEntity, FotoEntity, RedsocialEntity]),
];