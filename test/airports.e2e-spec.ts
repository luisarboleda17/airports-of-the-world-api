
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AppModule } from '../src/app.module';
import { Airport, AirportDTO } from '../src/models';

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

  it('Fetch all airports with default pagination values, then receive all airports', async () => {
    await airportRepository.save(AIRPORTS_EXAMPLES.map(airport => AirportDTO.from(airport).toEntity()));
    return request(app.getHttpServer())
      .get('/airports')
      .expect(200)
      .expect({
        data: {
          page: 1,
          pages: 1,
          limit: 10,
          total: AIRPORTS_EXAMPLES.length,
          data: AIRPORTS_EXAMPLES,
        },
      });
  });

  it('Fetch all airports with specified pagination values, then receive all airports', async () => {
    await airportRepository.save(AIRPORTS_EXAMPLES.map(airport => AirportDTO.from(airport).toEntity()));
    return request(app.getHttpServer())
      .get('/airports?page=1&limit=15')
      .expect(200)
      .expect({
        data: {
          page: 1,
          pages: 1,
          limit: 15,
          total: AIRPORTS_EXAMPLES.length,
          data: AIRPORTS_EXAMPLES,
        },
      });
  });

  it('Fetch all airports with specified pagination values, then receive empty airports list', async () => {
    await airportRepository.save(AIRPORTS_EXAMPLES.map(airport => AirportDTO.from(airport).toEntity()));
    return request(app.getHttpServer())
      .get('/airports?page=100&limit=25')
      .expect(200)
      .expect({
        data: {
          page: 100,
          pages: 1,
          limit: 25,
          total: AIRPORTS_EXAMPLES.length,
          data: [],
        },
      });
  });

  it('Fetch all airports with default pagination, and name filter, then receive an one-length airports list', async () => {
    await airportRepository.save([AirportDTO.from(AIRPORTS_EXAMPLES[0]).toEntity()]);
    return request(app.getHttpServer())
      .get(`/airports?name=${AIRPORTS_EXAMPLES[0].name}`)
      .expect(200)
      .expect({
        data: {
          page: 1,
          pages: 1,
          limit: 10,
          total: 1,
          data: [AIRPORTS_EXAMPLES[0]],
        },
      });
  });

  it('Fetch all airports with default pagination, and city filter, then receive an one-length airports list', async () => {
    await airportRepository.save([AirportDTO.from(AIRPORTS_EXAMPLES[0]).toEntity()]);
    return request(app.getHttpServer())
      .get(`/airports?city=${AIRPORTS_EXAMPLES[0].city}`)
      .expect(200)
      .expect({
        data: {
          page: 1,
          pages: 1,
          limit: 10,
          total: 1,
          data: [AIRPORTS_EXAMPLES[0]],
        },
      });
  });

  it('Fetch all airports with default pagination, and country filter, then receive an one-length airports list', async () => {
    await airportRepository.save([AirportDTO.from(AIRPORTS_EXAMPLES[0]).toEntity()]);
    return request(app.getHttpServer())
      .get(`/airports?country=${AIRPORTS_EXAMPLES[0].country}`)
      .expect(200)
      .expect({
        data: {
          page: 1,
          pages: 1,
          limit: 10,
          total: 1,
          data: [AIRPORTS_EXAMPLES[0]],
        },
      });
  });

  it('Fetch all airports with default pagination, and name, city and country filters, then receive an one-length airports list', async () => {
    const exampleAirport = AIRPORTS_EXAMPLES[0];
    await airportRepository.save([AirportDTO.from(exampleAirport).toEntity()]);
    return request(app.getHttpServer())
      .get(`/airports?name=${exampleAirport.name}&city=${exampleAirport.city}&country=${exampleAirport.country}`)
      .expect(200)
      .expect({
        data: {
          page: 1,
          pages: 1,
          limit: 10,
          total: 1,
          data: [AIRPORTS_EXAMPLES[0]],
        },
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
