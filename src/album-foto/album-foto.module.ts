import { Module } from '@nestjs/common';
import { AlbumFotoService } from './album-foto.service';
import { AlbumFotoController } from './album-foto.controller';

@Module({
  providers: [AlbumFotoService],
  controllers: [AlbumFotoController]
})
export class AlbumFotoModule {}
