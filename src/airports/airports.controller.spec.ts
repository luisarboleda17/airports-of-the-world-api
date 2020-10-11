
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { AirportsController } from './airports.controller';
import { AirportsService } from './airports.service';
import { AirportDTO } from '../models/airport.dto';

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

const airportsServiceMockFactory = () => ({
  findByIATA: jest.fn(),
  findByICAO: jest.fn(),
  findAll: jest.fn(),
});

describe('AirportsController', () => {
  let controller: AirportsController;
  let service: AirportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirportsController],
      providers: [
        { provide: AirportsService, useFactory: airportsServiceMockFactory, }
      ],
    }).compile();

    service = module.get<AirportsService>(AirportsService);
    controller = module.get<AirportsController>(AirportsController);
  });

  it('should return a list of airports', async () => {
    const airportsServiceFindAllSpy = jest.spyOn(service, 'findAll').mockResolvedValue(AIRPORTS_EXAMPLES);
    const airports = await controller.findAll();

    expect(airportsServiceFindAllSpy).toBeCalledTimes(1);
    expect(airports.data).toEqual(AIRPORTS_EXAMPLES);
  });

  it('search by IATA, then should return an airport object', async () => {
    const airportsServiceFindSpy = jest.spyOn(service, 'findByIATA').mockResolvedValue(AIRPORTS_EXAMPLES[0]);
    const airport = await controller.findByIATA(AIRPORTS_EXAMPLES[0].IATA);

    expect(airportsServiceFindSpy).toBeCalledTimes(1);
    expect(airportsServiceFindSpy).toBeCalledWith(AIRPORTS_EXAMPLES[0].IATA);
    expect(airport.data).toEqual(AIRPORTS_EXAMPLES[0]);
  });

  it('search by IATA, then should throw a not found exception', async () => {
    const airportsServiceFindSpy = jest.spyOn(service, 'findByIATA').mockResolvedValue(null);

    try {
      await controller.findByIATA('test-iata')
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('An airport with IATA code test-iata was not found');
    }
    expect(airportsServiceFindSpy).toBeCalledTimes(1);
    expect(airportsServiceFindSpy).toBeCalledWith('test-iata');
  });

  it('search by ICAO, then should return an airport object', async () => {
    const airportsServiceFindSpy = jest.spyOn(service, 'findByICAO').mockResolvedValue(AIRPORTS_EXAMPLES[0]);
    const airport = await controller.findByICAO(AIRPORTS_EXAMPLES[0].ICAO);

    expect(airportsServiceFindSpy).toBeCalledTimes(1);
    expect(airportsServiceFindSpy).toBeCalledWith(AIRPORTS_EXAMPLES[0].ICAO);
    expect(airport.data).toEqual(AIRPORTS_EXAMPLES[0]);
  });

  it('search by ICAO, then should throw a not found exception', async () => {
    const airportsServiceFindSpy = jest.spyOn(service, 'findByICAO').mockResolvedValue(null);

    try {
      await controller.findByICAO('test-icao')
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('An airport with ICAO code test-icao was not found');
    }
    expect(airportsServiceFindSpy).toBeCalledTimes(1);
    expect(airportsServiceFindSpy).toBeCalledWith('test-icao');
  });
});
