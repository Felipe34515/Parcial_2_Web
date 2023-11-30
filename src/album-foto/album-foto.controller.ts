import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';;
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { AlbumFotoService } from './album-foto.service';


@Controller('album-foto')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumFotoController {
    constructor(private readonly albumFotoService: AlbumFotoService) {}


    @Post(':albumId/foto/:fotoId')
    async addFotoToAlbum(@Param('albumId') albumId: string, @Param('fotoId') fotoId: string) {
        return await this.albumFotoService.addFotoToAlbum(albumId, fotoId);
    }

    @Get(':albumId/foto')
    async findFotosByAlbumId(@Param('albumId') albumId: string) {
        return await this.albumFotoService.findFotosByAlbumId(albumId);
    }
    
}