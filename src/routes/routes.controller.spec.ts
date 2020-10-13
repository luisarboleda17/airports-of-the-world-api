
import { Test, TestingModule } from '@nestjs/testing';

import { RoutesController } from './routes.controller';
import { RouteDTO, RouteCodeDTO, RouteSearchFiltersDTO, RouteAirportCodesDTO } from '../models';
import { RoutesService } from './routes.service';
import { NotFoundException } from '@nestjs/common';

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

const routesServiceMockFactory = () => ({
  findByCode: jest.fn(),
  findByAirportCodes: jest.fn(),
});

describe('RoutesController', () => {
  let controller: RoutesController;
  let routesService: RoutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoutesController],
      providers: [
        { provide: RoutesService, useFactory: routesServiceMockFactory, }
      ],
    }).compile();

    controller = module.get<RoutesController>(RoutesController);
    routesService = module.get<RoutesService>(RoutesService);
  });

  it('search by code, then return a route object', async () => {
    const routesServiceFindByCodeSpy = jest.spyOn(routesService, 'findByCode')
      .mockResolvedValue(ROUTES_EXAMPLES[0]);
    const routeCodeDTO = RouteCodeDTO.from({ code: ROUTES_EXAMPLES[0].code });
    const routeSearchFiltersDTO = RouteSearchFiltersDTO.from({ full: false, });
    const route = await controller.findByCode(routeCodeDTO, routeSearchFiltersDTO);

    expect(routesServiceFindByCodeSpy).toBeCalledTimes(1);
    expect(routesServiceFindByCodeSpy).toBeCalledWith(routeCodeDTO, routeSearchFiltersDTO);
    expect(route.data).toEqual(ROUTES_EXAMPLES[0]);
  });

  it('search by code, then throw a not found exception', async () => {
    const routesServiceFindByCodeSpy = jest.spyOn(routesService, 'findByCode')
      .mockResolvedValue(null);
    const routeCodeDTO = RouteCodeDTO.from({ code: 'test-code' });
    const routeSearchFiltersDTO = RouteSearchFiltersDTO.from({ full: false, });

    try {
      await controller.findByCode(routeCodeDTO, routeSearchFiltersDTO);
    } catch(error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('A route with code test-code was not found');
    }

    expect(routesServiceFindByCodeSpy).toBeCalledTimes(1);
    expect(routesServiceFindByCodeSpy).toBeCalledWith(routeCodeDTO, routeSearchFiltersDTO);
  });

  it('search by airport codes, then return a route object', async () => {
    const routesServiceFindByAirportCodesSpy = jest.spyOn(routesService, 'findByAirportCodes')
      .mockResolvedValue(ROUTES_EXAMPLES[0]);
    const routeAirportCodes = RouteAirportCodesDTO.from({
      originIATACode: 'test-iata',
      destinationIATACode: 'test-iata'
    });
    const routeSearchFiltersDTO = RouteSearchFiltersDTO.from({ full: false, });
    const route = await controller.findByAirportCodes(routeAirportCodes, routeSearchFiltersDTO);

    expect(routesServiceFindByAirportCodesSpy).toBeCalledTimes(1);
    expect(routesServiceFindByAirportCodesSpy).toBeCalledWith(routeAirportCodes, routeSearchFiltersDTO);
    expect(route.data).toEqual(ROUTES_EXAMPLES[0]);
  });

  it('search by airport codes, then throw a not found exception', async () => {
    const routesServiceFindByAirportCodesSpy = jest.spyOn(routesService, 'findByAirportCodes')
      .mockResolvedValue(null);
    const routeAirportCodes = RouteAirportCodesDTO.from({
      originIATACode: 'test-iata',
      destinationIATACode: 'test-iata'
    });
    const routeSearchFiltersDTO = RouteSearchFiltersDTO.from({ full: false, });

    try {
      await controller.findByAirportCodes(routeAirportCodes, routeSearchFiltersDTO);
    } catch(error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe(routeAirportCodes.getErrorMessage());
    }

    expect(routesServiceFindByAirportCodesSpy).toBeCalledTimes(1);
    expect(routesServiceFindByAirportCodesSpy).toBeCalledWith(routeAirportCodes, routeSearchFiltersDTO);
  });
});
