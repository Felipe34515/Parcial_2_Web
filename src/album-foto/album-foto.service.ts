import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AlbumEntity } from '../album/album.entity';
import { FotoEntity } from 'src/foto/foto.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class AlbumFotoService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,

        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>,

    ) {}

    async addFotoToAlbum(albumId: string, fotoId: string): Promise<AlbumEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotoId}});
        if (!foto) 
            throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);

        const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ['fotos', 'performers']})
        if (!album) 
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);

        album.fotos= [...album.fotos, foto];
        return await this.albumRepository.save(album);
        
    }

    async findFotosByAlbumId(albumId: string): Promise<FotoEntity[]> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ['fotos']})
        if (!album) 
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        return album.fotos;
    }
    
}