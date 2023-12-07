import { Injectable } from '@nestjs/common';
import { FotoEntity } from './foto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException } from '../shared/errors/business-errors';
import { BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class FotoService {

    constructor(
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>,
    ) {}

    async createFoto(foto: FotoEntity): Promise<FotoEntity> {
        if (foto.ISO < 100 && foto.ISO > 6400 && foto.velObturacion < 2 && foto.velObturacion > 250 && foto.apertura < 100 && foto.apertura > 6400)
            throw new BusinessLogicException("La foto está mal", BusinessError.PRECONDITION_FAILED);
        return await this.fotoRepository.save(foto);
    }

    async findAll(): Promise<FotoEntity[]> {
        return await this.fotoRepository.find();
    }

    async findFotoById(id: string): Promise<FotoEntity> {
        console.log('Provided ID:', id);

        const foto: FotoEntity = await this.fotoRepository.findOne( {where:{id} });
        if (!foto) 
            throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
        return foto;
        }

    async deleteFoto(id: string){
        const foto: FotoEntity = await this.fotoRepository.findOne( {where:{id} });
        if (!foto ) 
            throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
        return await this.fotoRepository.remove(foto);
    }

}
