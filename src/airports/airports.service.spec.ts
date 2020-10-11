
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AirportsService } from './airports.service';
import { AirportDTO } from '../models/airport.dto';
import { Airport } from '../models/airport.entity';

const AIRPORTS_EXAMPLES = [
  AirportDTO.from({
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
  }),
  AirportDTO.from({
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
  }),
];

let airportRepositoryGetManyMock = jest.fn();
const airportRepositoryFactoryMock = jest.fn(() => ({
  findOne: jest.fn(),
  find: jest.fn(),
  count: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    orderBy: jest.fn().mockReturnThis(),
    offset: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    getMany: airportRepositoryGetManyMock,
  })),
}));

describe('AirportsService', () => {
  let service: AirportsService;
  let airportRepository: Repository<Airport>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AirportsService,
        { provide: getRepositoryToken(Airport), useFactory: airportRepositoryFactoryMock }
      ],
    }).compile();

    service = module.get<AirportsService>(AirportsService);
    airportRepository = module.get(getRepositoryToken(Airport));
  });

  it('should return a list of airports', async () => {
    const airportRepositoryCountSpy = jest.spyOn(airportRepository, 'count').mockResolvedValue(AIRPORTS_EXAMPLES.length);
    airportRepositoryGetManyMock = airportRepositoryGetManyMock.mockResolvedValue(AIRPORTS_EXAMPLES.map(airport => airport.toEntity()));
    const airports = await service.findAll({ page: 1, limit: 10 });

    expect(airportRepositoryGetManyMock).toBeCalledTimes(1);
    expect(airportRepositoryCountSpy).toBeCalledTimes(1);
    expect(airports.page).toBe(1);
    expect(airports.limit).toBe(10);
    expect(airports.pages).toBe(1);
    expect(airports.total).toBe(AIRPORTS_EXAMPLES.length);
    expect(airports.data).toEqual(AIRPORTS_EXAMPLES);
  });

  it('search by IATA code, then should return an airport object', async () => {
    const airportRepositoryFindOneSpy = jest.spyOn(airportRepository, 'findOne')
      .mockResolvedValue(AIRPORTS_EXAMPLES[0].toEntity());
    const airport = await service.findByIATA(AIRPORTS_EXAMPLES[0].IATA);

    expect(airportRepositoryFindOneSpy).toBeCalledTimes(1);
    expect(airportRepositoryFindOneSpy).toBeCalledWith({ where: { iata: AIRPORTS_EXAMPLES[0].IATA }});
    expect(airport).toEqual(AIRPORTS_EXAMPLES[0]);
  });

  it('search by IATA code, then should return null', async () => {
    const airportRepositoryFindOneSpy = jest.spyOn(airportRepository, 'findOne')
      .mockResolvedValue(null);
    const airport = await service.findByIATA('test-iata');

    expect(airportRepositoryFindOneSpy).toBeCalledTimes(1);
    expect(airportRepositoryFindOneSpy).toBeCalledWith({ where: { iata: 'test-iata' }});
    expect(airport).toBeNull();
  });

  it('search by ICAO code, then should return an airport object', async () => {
    const airportRepositoryFindOneSpy = jest.spyOn(airportRepository, 'findOne')
      .mockResolvedValue(AIRPORTS_EXAMPLES[0].toEntity());
    const airport = await service.findByICAO(AIRPORTS_EXAMPLES[0].ICAO);

    expect(airportRepositoryFindOneSpy).toBeCalledTimes(1);
    expect(airportRepositoryFindOneSpy).toBeCalledWith({ where: { icao: AIRPORTS_EXAMPLES[0].ICAO }});
    expect(airport).toEqual(AIRPORTS_EXAMPLES[0]);
  });

  it('search by ICAO code, then should return null', async () => {
    const airportRepositoryFindOneSpy = jest.spyOn(airportRepository, 'findOne')
      .mockResolvedValue(null);
    const airport = await service.findByICAO('test-icao');

    expect(airportRepositoryFindOneSpy).toBeCalledTimes(1);
    expect(airportRepositoryFindOneSpy).toBeCalledWith({ where: { icao: 'test-icao' }});
    expect(airport).toBeNull();
  });
});
