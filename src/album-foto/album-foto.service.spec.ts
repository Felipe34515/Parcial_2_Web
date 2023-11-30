import { Test, TestingModule } from '@nestjs/testing';
import { AlbumFotoService } from './album-foto.service';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../album/album.entity';
import { FotoEntity } from '../foto/foto.entity';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { get } from 'http';
import { getRepositoryToken } from '@nestjs/typeorm';


describe('AlbumFotoService', () => {
  let service: AlbumFotoService;
  let albumRepository: Repository<AlbumEntity>;
  let fotoRepository: Repository<FotoEntity>;
  let album : AlbumEntity;
  let fotoList: FotoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumFotoService],
    }).compile();

    service = module.get<AlbumFotoService>(AlbumFotoService);
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    fotoRepository = module.get<Repository<FotoEntity>>(getRepositoryToken(FotoEntity));
    await seedDatabase();
  });


  const seedDatabase =async () => {
    albumRepository.clear();
    fotoRepository.clear();
    fotoList = [];
    for(let i=0; i<5; i++) {
      const foto: FotoEntity = await fotoRepository.save({
        
      })
      fotoList.push(foto);
    }

    album = await albumRepository.save({
      nombre: faker.music.genre(),
      caratula: faker.lorem.word(),
      fecha: faker.date.past(),
      descripcion: faker.lorem.paragraph(),
      fotos: fotoList
    })
  }



  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a foto to an album', async () => {
    const newFoto: FotoEntity = await fotoRepository.save({
      nombre: faker.music.genre(),
      duracion: faker.number.int()

    });

    const newAlbum: AlbumEntity = await albumRepository.save({
      nombre: faker.music.genre(),
      caratula: faker.lorem.word(),
      fecha: faker.date.past(),
      descripcion: faker.lorem.paragraph(),
    });

    const result: AlbumEntity = await service.addFotoToAlbum(newAlbum.id, newFoto.id);
    expect(result.fotos.length).toBe(1);
  });

});