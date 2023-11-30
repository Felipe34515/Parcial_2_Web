import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { PerformerService } from './performer/performer.service';
import { PerformerModule } from './performer/performer.module';

@Module({
  imports: [AlbumModule, TrackModule, PerformerModule],
  controllers: [AppController],
  providers: [AppService, PerformerService],
})
export class AppModule {}
