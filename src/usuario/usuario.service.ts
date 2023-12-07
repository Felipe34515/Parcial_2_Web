import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException } from '../shared/errors/business-errors';
import { BusinessError } from '../shared/errors/business-errors';
@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
    ) {}

    async createUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        const telefonoStr = usuario.telefono.toString();
        if (telefonoStr.length != 10) {
            throw new BusinessLogicException("The usuario dosent have the requirements", BusinessError.PRECONDITION_FAILED);
    }
    return await this.usuarioRepository.save(usuario);
    }

    async findAll(): Promise<UsuarioEntity[]> {
        return await this.usuarioRepository.find({ relations: ["fotos"] });
    }

    async findOne(id: string): Promise<UsuarioEntity> {
        // console.log('Provided ID:', id);

        const usuario: UsuarioEntity = await this.usuarioRepository.findOne( {where:{id}});
        if (!usuario) 
            throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND);
        return usuario;
        }
}
