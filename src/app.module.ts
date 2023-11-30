import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FotoModule } from './foto/foto.module';
import { RedsocialModule } from './redsocial/redsocial.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AlbumModule } from './album/album.module';
import { AlbumFotoModule } from './album-foto/album-foto.module';

@Module({
  imports: [FotoModule, RedsocialModule, UsuarioModule, AlbumModule, AlbumFotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
