import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AirportsService } from '../src/airports/airports.service';

describe('Airports (e2e)', () => {
  let app: INestApplication;
  const airportsService = {
    findAll: () => [{id: 1}, {id: 1}],
    find: (id: string) => id === '1' ? {id: 1} : null,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(AirportsService)
      .useValue(airportsService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Fetch all airports, then receive all airports', () => {
    return request(app.getHttpServer())
      .get('/airports')
      .expect(200)
      .expect({
        data: airportsService.findAll(),
      });
  });

  it('Fetch and airport by it\'s id, then receive an airport', () => {
    return request(app.getHttpServer())
      .get('/airports/1')
      .expect(200)
      .expect({
        data: airportsService.find('1'),
      });
  });

  it('Fetch and airport by it\'s id, then throw an error if it is not found', () => {
    return request(app.getHttpServer())
      .get('/airports/2')
      .expect(404);
  });
});
