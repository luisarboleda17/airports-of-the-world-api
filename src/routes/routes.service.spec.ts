
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  Airport,
  AirportDTO,
  Route,
  RouteAirportCodesDTO,
  RouteCodeDTO,
  RouteDTO,
  RouteSearchFiltersDTO,
} from '../models';
import { RoutesService } from './routes.service';

const ROUTES_EXAMPLES = [
  RouteDTO.from({
    code: 'PTY-VLN',
    distance:'785',
    originIata: 'PTY',
    destinationIata: 'VLN'
  }),
  RouteDTO.from({
    code: 'MIA-LAX',
    distance:'2342',
    originIata: 'MIA',
    destinationIata: 'LAX',
  }),
];

describe('RoutesService', () => {
  let routesService: RoutesService;
  let routeRepository: Repository<Route>;
  let airportRepository: Repository<Airport>;

  beforeEach(async () => {
    const routeRepositoryFactoryMock = jest.fn(() => ({
      findOne: jest.fn(),
    }));
    const airportRepositoryFactoryMock = jest.fn(() => ({
      findOne: jest.fn(),
    }));
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoutesService,
        { provide: getRepositoryToken(Route), useFactory: routeRepositoryFactoryMock },
        { provide: getRepositoryToken(Airport), useFactory: airportRepositoryFactoryMock }
      ],
    }).compile();

    routesService = module.get<RoutesService>(RoutesService);
    routeRepository = module.get(getRepositoryToken(Route));
    airportRepository = module.get(getRepositoryToken(Airport));
  });

  it('search by route code, then return a route object', async () => {
    const routeRepositoryFindOneSpy = jest.spyOn(routeRepository, 'findOne')
      .mockResolvedValue(ROUTES_EXAMPLES[0].toEntity());
    const route = await routesService.findByCode(
      RouteCodeDTO.from({ code: ROUTES_EXAMPLES[0].code }),
      RouteSearchFiltersDTO.from({ full: false }),
    );

    expect(routeRepositoryFindOneSpy).toBeCalledTimes(1);
    expect(routeRepositoryFindOneSpy).toBeCalledWith(ROUTES_EXAMPLES[0].code, { relations: [] });
    expect(route).toEqual(ROUTES_EXAMPLES[0]);
  });

  it('search by route code and with full filter, then return a route object', async () => {
    const routeRepositoryFindOneSpy = jest.spyOn(routeRepository, 'findOne')
      .mockResolvedValue(ROUTES_EXAMPLES[0].toEntity());
    const route = await routesService.findByCode(
      RouteCodeDTO.from({ code: ROUTES_EXAMPLES[0].code }),
      RouteSearchFiltersDTO.from({ full: true }),
    );

    expect(routeRepositoryFindOneSpy).toBeCalledTimes(1);
    expect(routeRepositoryFindOneSpy).toBeCalledWith(ROUTES_EXAMPLES[0].code, { relations: [ 'origin', 'destination' ] });
    expect(route).toEqual(ROUTES_EXAMPLES[0]);
  });

  it('search by route code, then return null', async () => {
    const routeRepositoryFindOneSpy = jest.spyOn(routeRepository, 'findOne')
      .mockResolvedValue(null);
    const route = await routesService.findByCode(
      RouteCodeDTO.from({ code: ROUTES_EXAMPLES[0].code }),
      RouteSearchFiltersDTO.from({ full: false }),
    );

    expect(routeRepositoryFindOneSpy).toBeCalledTimes(1);
    expect(routeRepositoryFindOneSpy).toBeCalledWith(ROUTES_EXAMPLES[0].code, { relations: [] });
    expect(route).toBeNull();
  });

  it('search by origin iata and destination iata, then return a route object', async () => {
    const routeRepositoryFindOneSpy = jest.spyOn(routeRepository, 'findOne')
      .mockResolvedValue(ROUTES_EXAMPLES[0].toEntity());
    const airportRepositoryFindOneSpy = jest.spyOn(airportRepository, 'findOne');
    const route = await routesService.findByAirportCodes(
      RouteAirportCodesDTO.from({
        originIATACode: ROUTES_EXAMPLES[0].originIata,
        destinationIATACode: ROUTES_EXAMPLES[0].destinationIata
      }),
      RouteSearchFiltersDTO.from({ full: false }),
    );

    expect(routeRepositoryFindOneSpy).toBeCalledTimes(1);
    expect(routeRepositoryFindOneSpy).toBeCalledWith({
      where: { originIata: ROUTES_EXAMPLES[0].originIata, destinationIata: ROUTES_EXAMPLES[0].destinationIata },
      relations: [],
    });
    expect(airportRepositoryFindOneSpy).toBeCalledTimes(0);
    expect(route).toEqual(ROUTES_EXAMPLES[0]);
  });

  it('search by origin iata and destination iata, then return null', async () => {
    const routeRepositoryFindOneSpy = jest.spyOn(routeRepository, 'findOne')
      .mockResolvedValue(null);
    const airportRepositoryFindOneSpy = jest.spyOn(airportRepository, 'findOne');
    const route = await routesService.findByAirportCodes(
      RouteAirportCodesDTO.from({
        originIATACode: ROUTES_EXAMPLES[0].originIata,
        destinationIATACode: ROUTES_EXAMPLES[0].destinationIata
      }),
      RouteSearchFiltersDTO.from({ full: false }),
    );

    expect(routeRepositoryFindOneSpy).toBeCalledTimes(1);
    expect(routeRepositoryFindOneSpy).toBeCalledWith({
      where: { originIata: ROUTES_EXAMPLES[0].originIata, destinationIata: ROUTES_EXAMPLES[0].destinationIata },
      relations: [],
    });
    expect(airportRepositoryFindOneSpy).toBeCalledTimes(0);
    expect(route).toEqual(null);
  });

  it('search by origin iata and destination icao, then return a route object', async () => {
    const routeRepositoryFindOneSpy = jest.spyOn(routeRepository, 'findOne')
      .mockResolvedValue(ROUTES_EXAMPLES[0].toEntity());
    const airportRepositoryFindOneSpy = jest.spyOn(airportRepository, 'findOne')
      .mockResolvedValue(AirportDTO.from({ IATA: ROUTES_EXAMPLES[0].destinationIata }).toEntity());
    const route = await routesService.findByAirportCodes(
      RouteAirportCodesDTO.from({
        originIATACode: ROUTES_EXAMPLES[0].originIata,
        destinationICAOCode: 'test-icao',
      }),
      RouteSearchFiltersDTO.from({ full: false }),
    );

    expect(routeRepositoryFindOneSpy).toBeCalledTimes(1);
    expect(routeRepositoryFindOneSpy).toBeCalledWith({
      where: { originIata: ROUTES_EXAMPLES[0].originIata, destinationIata: ROUTES_EXAMPLES[0].destinationIata },
      relations: [],
    });
    expect(airportRepositoryFindOneSpy).toBeCalledTimes(1);
    expect(airportRepositoryFindOneSpy).toBeCalledWith({
      where: { icao: 'test-icao' },
      loadEagerRelations: false,
    });
    expect(route).toEqual(ROUTES_EXAMPLES[0]);
  });

  it('search by origin icao and destination icao, then return a route object', async () => {
    const routeRepositoryFindOneSpy = jest.spyOn(routeRepository, 'findOne')
      .mockResolvedValue(ROUTES_EXAMPLES[0].toEntity());
    const airportRepositoryFindOneSpy = jest.spyOn(airportRepository, 'findOne')
      .mockResolvedValue(AirportDTO.from({ IATA: 'test-iata' }).toEntity());
    const route = await routesService.findByAirportCodes(
      RouteAirportCodesDTO.from({
        originICAOCode: 'test-icao',
        destinationICAOCode: 'test-icao',
      }),
      RouteSearchFiltersDTO.from({ full: false }),
    );

    expect(routeRepositoryFindOneSpy).toBeCalledTimes(1);
    expect(routeRepositoryFindOneSpy).toBeCalledWith({
      where: { originIata: 'test-iata', destinationIata: 'test-iata' },
      relations: [],
    });
    expect(airportRepositoryFindOneSpy).toBeCalledTimes(2);
    expect(airportRepositoryFindOneSpy).toBeCalledWith({
      where: { icao: 'test-icao' },
      loadEagerRelations: false,
    });
    expect(route).toEqual(ROUTES_EXAMPLES[0]);
  });

  it('search by origin icao and destination icao and with full filter, then return a route object', async () => {
    const routeRepositoryFindOneSpy = jest.spyOn(routeRepository, 'findOne')
      .mockResolvedValue(ROUTES_EXAMPLES[0].toEntity());
    const airportRepositoryFindOneSpy = jest.spyOn(airportRepository, 'findOne')
      .mockResolvedValue(AirportDTO.from({ IATA: 'test-iata' }).toEntity());
    const route = await routesService.findByAirportCodes(
      RouteAirportCodesDTO.from({
        originICAOCode: 'test-icao',
        destinationICAOCode: 'test-icao',
      }),
      RouteSearchFiltersDTO.from({ full: true }),
    );

    expect(routeRepositoryFindOneSpy).toBeCalledTimes(1);
    expect(routeRepositoryFindOneSpy).toBeCalledWith({
      where: { originIata: 'test-iata', destinationIata: 'test-iata' },
      relations: [ 'origin', 'destination' ],
    });
    expect(airportRepositoryFindOneSpy).toBeCalledTimes(2);
    expect(airportRepositoryFindOneSpy).toBeCalledWith({
      where: { icao: 'test-icao' },
      loadEagerRelations: false,
    });
    expect(route).toEqual(ROUTES_EXAMPLES[0]);
  });
});
