import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { FotoEntity } from '../foto/foto.entity';
import { BusinessError } from '../shared/errors/business-errors';
import { BusinessLogicException } from '../shared/errors/business-errors';


@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,
    ) {}

    async findAll(): Promise<AlbumEntity[]> {
        return await this.albumRepository.find();
    }

    async findAlbumById(id: string): Promise<AlbumEntity> {
        console.log('Provided ID:', id);

        const album: AlbumEntity = await this.albumRepository.findOne( {where:{id}, relations: ["fotos"] });
        if (!album) 
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        return album;
    }

    async createAlbum(album: AlbumEntity): Promise<AlbumEntity> {
        if (!album.título || !album.fechaInicio)
            throw new BusinessLogicException("The album name and date are required", BusinessError.PRECONDITION_FAILED);
        return await this.albumRepository.save(album);
    }

    async deleteAlbum(id: string){
        const album: AlbumEntity = await this.albumRepository.findOne( {where:{id} });
        if (!album ) 
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        return await this.albumRepository.remove(album);
    }


    async addPhotoToAlbum(album: AlbumEntity, foto: FotoEntity){
        if (!album.fotos){
            album.fotos = [foto]
        }
        else{
            album.fotos.push(foto)
        }
    }

    async findOne(id: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne( {where:{id}, relations: ["fotos"]})
        if (!album) 
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        return album;
    }




}
