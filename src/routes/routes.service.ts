
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route, RouteSearchFiltersDTO, RouteCodeDTO, RouteAirportCodesDTO, Airport, RouteDTO } from '../models';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Airport)
    private readonly airportRepository: Repository<Airport>,
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
  ) { }

  /**
   * Find a route by it's route code
   * @param routeCodeDTO
   * @param routeSearchFiltersDTO
   */
  async findByCode(
    routeCodeDTO: RouteCodeDTO,
    routeSearchFiltersDTO: RouteSearchFiltersDTO,
  ): Promise<RouteDTO> {
    const route = await this.routeRepository.findOne(
      routeCodeDTO.code,
      {
        relations: routeSearchFiltersDTO.full ? [ 'origin', 'destination' ] : [],
      },
    )
    return route ? RouteDTO.fromEntity(route) : null;
  }

  /**
   * Find a route by it's origin IATA or ICAO code and it's destination IATA or ICAO code
   * @param routeAirportCodesDTO
   * @param routeSearchFiltersDTO
   */
  async findByAirportCodes(
    routeAirportCodesDTO: RouteAirportCodesDTO,
    routeSearchFiltersDTO: RouteSearchFiltersDTO,
  ): Promise<RouteDTO> {
    const originIATACode = routeAirportCodesDTO.originIATACode || await this.findIATACodeFromICAOCode(routeAirportCodesDTO.originICAOCode);
    const destinationIATACode = routeAirportCodesDTO.destinationIATACode || await this.findIATACodeFromICAOCode(routeAirportCodesDTO.destinationICAOCode);
    const route = await this.routeRepository.findOne({
      where: { originIata: originIATACode, destinationIata: destinationIATACode },
      relations: routeSearchFiltersDTO.full ? [ 'origin', 'destination' ] : [],
    });
    return route ? RouteDTO.fromEntity(route) : null;
  }

  /**
   * Get IATA code for an airport by it's ICAO code
   * @param icaoCode
   */
  private async findIATACodeFromICAOCode(icaoCode: string): Promise<string> {
    const airport = await this.airportRepository.findOne({
      where: { icao: icaoCode },
      loadEagerRelations: false,
    });
    return airport?.iata;
  }
}
