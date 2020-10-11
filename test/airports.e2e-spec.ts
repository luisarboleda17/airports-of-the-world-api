
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { AirportDTO } from '../src/models/airport.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Airport } from '../src/models/airport.entity';
import { Repository } from 'typeorm';

const AIRPORTS_EXAMPLES = [
  {
    name: 'Goroka Airport',
    city: 'Goroka',
    country: 'Papua New Guinea',
    IATA: 'GKA',
    ICAO: 'AYGA',
    latitude: '-6.08168983459',
    longitude: '145.391998291',
    altitude: '5282',
    timezone: 10,
    dst: 'U',
    type: 'airport',
    source: 'OurAirports'
  },
  {
    name: 'Madang Airport',
    city: 'Madang',
    country: 'Papua New Guinea',
    IATA: 'MAG',
    ICAO: 'AYMD',
    latitude: '-5.20707988739',
    longitude: '145.789001465',
    altitude: '20',
    timezone: 10,
    dst: 'U',
    type: 'airport',
    source: 'OurAirports',
  },
];

describe('Airports (e2e)', () => {
  let app: INestApplication;
  let airportRepository: Repository<Airport>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    airportRepository = moduleFixture.get(getRepositoryToken(Airport));
    await app.init();
  });

  afterEach(async () => {
    await airportRepository.query(`DELETE FROM ${airportRepository.metadata.tableName}`);
    await app.close();
  });

  it('Fetch all airports, then receive all airports', async () => {
    await airportRepository.save(AIRPORTS_EXAMPLES.map(airport => AirportDTO.from(airport).toEntity()));
    return request(app.getHttpServer())
      .get('/airports')
      .expect(200)
      .expect({
        data: AIRPORTS_EXAMPLES,
      });
  });

  it('Fetch and airport by it\'s IATA code, then receive an airport', async () => {
    await airportRepository.save([AirportDTO.from(AIRPORTS_EXAMPLES[0]).toEntity()]);
    return request(app.getHttpServer())
      .get(`/airports/iata/${AIRPORTS_EXAMPLES[0].IATA}`)
      .expect(200)
      .expect({
        data: AIRPORTS_EXAMPLES[0],
      });
  });

  it('Fetch and airport by it\'s IATA code, then throw a not found exception', () => {
    return request(app.getHttpServer())
      .get('/airports/iata/test-iata')
      .expect(404);
  });

  it('Fetch and airport by it\'s ICAO code, then receive an airport', async () => {
    await airportRepository.save([AirportDTO.from(AIRPORTS_EXAMPLES[0]).toEntity()]);
    return request(app.getHttpServer())
      .get(`/airports/icao/${AIRPORTS_EXAMPLES[0].ICAO}`)
      .expect(200)
      .expect({
        data: AIRPORTS_EXAMPLES[0],
      });
  });

  it('Fetch and airport by it\'s ICAO code, then throw a not found exception', () => {
    return request(app.getHttpServer())
      .get('/airports/icao/test-icao')
      .expect(404);
  });
});
