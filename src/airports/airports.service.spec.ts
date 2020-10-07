
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AirportsService } from './airports.service';
import { AirportDTO } from '../models/airport.dto';
import { Airport } from '../models/airport.entity';

const AIRPORTS_EXAMPLES = [
  AirportDTO.from({
    id: '1',
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
    id: '2',
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

export class AirportRepositoryMock {
  public async findOne(): Promise<void> {
    return Promise.resolve();
  }
  public async find(): Promise<void> {
    return Promise.resolve();
  }
}

describe('AirportsService', () => {
  let service: AirportsService;
  let airportRepository: Repository<Airport>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AirportsService,
        { provide: getRepositoryToken(Airport), useClass: AirportRepositoryMock }
      ],
    }).compile();

    service = module.get<AirportsService>(AirportsService);
    airportRepository = module.get(getRepositoryToken(Airport));
  });

  it('should return a list of airports', async () => {
    const airportRepositoryFindSpy = jest.spyOn(airportRepository, 'find')
      .mockResolvedValue(AIRPORTS_EXAMPLES.map(airport => airport.toEntity()));
    const airports = await service.findAll();

    expect(airportRepositoryFindSpy).toBeCalledTimes(1);
    expect(airports.length).toBe(AIRPORTS_EXAMPLES.length);
    expect(airports).toEqual(AIRPORTS_EXAMPLES);
  });

  it('should return an airport object', async () => {
    const airportRepositoryFindOneSpy = jest.spyOn(airportRepository, 'findOne')
      .mockResolvedValue(AIRPORTS_EXAMPLES[0].toEntity());
    const airport = await service.find(AIRPORTS_EXAMPLES[0].id);

    expect(airportRepositoryFindOneSpy).toBeCalledTimes(1);
    expect(airportRepositoryFindOneSpy).toBeCalledWith({ where: { id: AIRPORTS_EXAMPLES[0].id }});
    expect(airport).toEqual(AIRPORTS_EXAMPLES[0]);
  });

  it('should return null, instead of an airport object', async () => {
    const airportRepositoryFindOneSpy = jest.spyOn(airportRepository, 'findOne')
      .mockResolvedValue(null);
    const airport = await service.find(AIRPORTS_EXAMPLES[0].id);

    expect(airportRepositoryFindOneSpy).toBeCalledTimes(1);
    expect(airportRepositoryFindOneSpy).toBeCalledWith({ where: { id: AIRPORTS_EXAMPLES[0].id }});
    expect(airport).toBeNull();
  });
});
