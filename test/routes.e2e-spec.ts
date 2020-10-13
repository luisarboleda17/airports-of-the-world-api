
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AppModule } from '../src/app.module';
import { RouteDTO, Airport, AirportDTO, Route } from '../src/models';

const ROUTE_EXAMPLE = {
  code: 'PTY-VLN',
  distance:'785',
  originIata: 'PTY',
  destinationIata: 'VLN'
};

const PTY_AIRPORT_EXAMPLE = {
  IATA: 'PTY',
  name: 'Tocumen International Airport',
  city: 'Panama City',
  country: 'Panama',
  ICAO: 'MPTO',
  latitude: '9.0713596344',
  longitude: '-79.3834991455',
  altitude: '135',
  timezone: -5,
  dst: 'U',
  type: 'airport',
  source: 'OurAirports'
};
const VLN_AIRPORT_EXAMPLE = {
  IATA: 'VLN',
  name: 'Arturo Michelena International Airport',
  city: 'Valencia',
  country: 'Venezuela',
  ICAO: 'SVVA',
  latitude: '10.1497325897217',
  longitude: '-67.9283981323242',
  altitude: '1411',
  timezone: -4,
  dst: 'U',
  type: 'airport',
  source: 'OurAirports'
};

describe('Routes (e2e)', () => {
  let app: INestApplication;
  let airportRepository: Repository<Airport>;
  let routeRepository: Repository<Route>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    airportRepository = moduleFixture.get(getRepositoryToken(Airport));
    routeRepository = moduleFixture.get(getRepositoryToken(Route));
    await app.init();

    // Insert base airports
    await airportRepository.save([AirportDTO.from(PTY_AIRPORT_EXAMPLE).toEntity()]);
    await airportRepository.save([AirportDTO.from(VLN_AIRPORT_EXAMPLE).toEntity()]);
  });

  afterEach(async () => {
    await routeRepository.query(`DELETE FROM ${routeRepository.metadata.tableName}`);
    await airportRepository.query(`DELETE FROM ${airportRepository.metadata.tableName}`);
    await app.close();
  });

  it('Fetch a route by it\'s code, then receive a route', async () => {
    await routeRepository.save([RouteDTO.from(ROUTE_EXAMPLE).toEntity()]);
    return request(app.getHttpServer())
      .get(`/routes/${ROUTE_EXAMPLE.code}`)
      .expect(200)
      .expect({
        data: ROUTE_EXAMPLE,
      });
  });

  it('Fetch a route by it\'s lowercase code, then receive a route', async () => {
    await routeRepository.save([RouteDTO.from(ROUTE_EXAMPLE).toEntity()]);
    return request(app.getHttpServer())
      .get(`/routes/${ROUTE_EXAMPLE.code.toLowerCase()}`)
      .expect(200)
      .expect({
        data: ROUTE_EXAMPLE,
      });
  });

  it('Fetch a route by it\'s code with full filter, then receive a route with it\'s relations', async () => {
    await routeRepository.save([RouteDTO.from(ROUTE_EXAMPLE).toEntity()]);
    return request(app.getHttpServer())
      .get(`/routes/${ROUTE_EXAMPLE.code}?full=1`)
      .expect(200)
      .expect({
        data: {
          ...ROUTE_EXAMPLE,
          origin: PTY_AIRPORT_EXAMPLE,
          destination: VLN_AIRPORT_EXAMPLE,
        },
      });
  });

  it('Fetch a route by a code, then throw a not found exception', () => {
    return request(app.getHttpServer())
      .get('/routes/ABC-ABC')
      .expect(404);
  });

  it('Fetch a route by a malformed route\'s code, then throw a bad request exception', () => {
    return request(app.getHttpServer())
      .get('/routes/ABCN-ABCN')
      .expect(400);
  });

  it('Fetch a route by an origin IATA code and destination IATA code, then receive a route', async () => {
    await routeRepository.save([RouteDTO.from(ROUTE_EXAMPLE).toEntity()]);
    return request(app.getHttpServer())
      .get(`/routes/from/iata/${ROUTE_EXAMPLE.originIata}/to/iata/${ROUTE_EXAMPLE.destinationIata}`)
      .expect(200)
      .expect({
        data: ROUTE_EXAMPLE,
      });
  });

  it('Fetch a route by an origin lowercase IATA code and destination lowercase IATA code, then receive a route', async () => {
    await routeRepository.save([RouteDTO.from(ROUTE_EXAMPLE).toEntity()]);
    return request(app.getHttpServer())
      .get(`/routes/from/iata/${ROUTE_EXAMPLE.originIata.toLowerCase()}/to/iata/${ROUTE_EXAMPLE.destinationIata.toLowerCase()}`)
      .expect(200)
      .expect({
        data: ROUTE_EXAMPLE,
      });
  });

  it('Fetch a route by an origin IATA code and destination IATA code with full filter, then receive a route with all it\'s relations', async () => {
    await routeRepository.save([RouteDTO.from(ROUTE_EXAMPLE).toEntity()]);
    return request(app.getHttpServer())
      .get(`/routes/from/iata/${ROUTE_EXAMPLE.originIata}/to/iata/${ROUTE_EXAMPLE.destinationIata}?full=1`)
      .expect(200)
      .expect({
        data: {
          ...ROUTE_EXAMPLE,
          origin: PTY_AIRPORT_EXAMPLE,
          destination: VLN_AIRPORT_EXAMPLE,
        },
      });
  });

  it('Fetch a route by an origin ICAO code and destination IATA code, then receive a route', async () => {
    await routeRepository.save([RouteDTO.from(ROUTE_EXAMPLE).toEntity()]);
    return request(app.getHttpServer())
      .get(`/routes/from/icao/${PTY_AIRPORT_EXAMPLE.ICAO}/to/iata/${ROUTE_EXAMPLE.destinationIata}`)
      .expect(200)
      .expect({
        data: ROUTE_EXAMPLE,
      });
  });

  it('Fetch a route by an origin IATA code and destination ICAO code, then receive a route', async () => {
    await routeRepository.save([RouteDTO.from(ROUTE_EXAMPLE).toEntity()]);
    return request(app.getHttpServer())
      .get(`/routes/from/iata/${ROUTE_EXAMPLE.originIata}/to/icao/${VLN_AIRPORT_EXAMPLE.ICAO}`)
      .expect(200)
      .expect({
        data: ROUTE_EXAMPLE,
      });
  });

  it('Fetch a route by an origin ICAO code and destination ICAO code, then receive a route', async () => {
    await routeRepository.save([RouteDTO.from(ROUTE_EXAMPLE).toEntity()]);
    return request(app.getHttpServer())
      .get(`/routes/from/icao/${PTY_AIRPORT_EXAMPLE.ICAO}/to/icao/${VLN_AIRPORT_EXAMPLE.ICAO}`)
      .expect(200)
      .expect({
        data: ROUTE_EXAMPLE,
      });
  });
});
