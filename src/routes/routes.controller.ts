
import { Controller, Get, NotFoundException, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';

import { RoutesService } from './routes.service';
import { ApiResponse, RouteAirportCodesDTO, RouteCodeDTO, RouteDTO, RouteSearchFiltersDTO } from '../models';

@Controller('routes')
export class RoutesController {
  constructor(
    private readonly routesService: RoutesService,
  ) { }

  /**
   * Find a route by it's route code
   * @param routeCodeDTO
   * @param routeSearchFiltersDTO
   */
  @Get(':code')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findByCode(
    @Param() routeCodeDTO: RouteCodeDTO,
    @Query() routeSearchFiltersDTO: RouteSearchFiltersDTO,
  ): Promise<ApiResponse<RouteDTO>> {
    const route = await this.routesService.findByCode(routeCodeDTO, routeSearchFiltersDTO);
    if (route)
      return { data: route };
    else
      throw new NotFoundException(`A route with code ${routeCodeDTO.code} was not found`);
  }

  /**
   * Find a route by it's origin IATA or ICAO code and it's destination IATA or ICAO code
   * @param routeAirportCodesDTO
   * @param routeSearchFiltersDTO
   */
  @Get([
    'from/iata/:originIATACode/to/iata/:destinationIATACode',
    'from/iata/:originIATACode/to/icao/:destinationICAOCode',
    'from/icao/:originICAOCode/to/iata/:destinationIATACode',
    'from/icao/:originICAOCode/to/icao/:destinationICAOCode',
  ])
  @UsePipes(new ValidationPipe({ transform: true }))
  async findByAirportCodes(
    @Param() routeAirportCodesDTO: RouteAirportCodesDTO,
    @Query() routeSearchFiltersDTO: RouteSearchFiltersDTO,
  ): Promise<ApiResponse<RouteDTO>> {
    const route = await this.routesService.findByAirportCodes(routeAirportCodesDTO, routeSearchFiltersDTO);
    if (route)
      return { data: route };
    else
      throw new NotFoundException(routeAirportCodesDTO.getErrorMessage());
  }
}
