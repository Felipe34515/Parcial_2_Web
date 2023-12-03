import { Injectable } from '@nestjs/common';
import { RedsocialEntity } from './redsocial.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException } from 'src/shared/errors/business-errors';
import { BusinessError } from 'src/shared/errors/business-errors';
@Injectable()
export class RedsocialService {
    constructor(
        @InjectRepository(RedsocialEntity)
        private readonly redsocialRepository: Repository<RedsocialEntity>,
    ) {}

    async createRedsocial(redsocial: RedsocialEntity): Promise<RedsocialEntity> {
        if (!redsocial.slogan || redsocial.slogan.length < 20)
            throw new BusinessLogicException("The redsocial name and date are required", BusinessError.PRECONDITION_FAILED);
        return await this.redsocialRepository.save(redsocial);
    }

}
