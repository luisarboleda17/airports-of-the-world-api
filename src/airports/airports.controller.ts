
import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { AirportsService } from './airports.service';
import { ApiResponse } from '../models/api-response';
import { AirportDTO } from '../models/airport.dto';

@Controller('airports')
export class AirportsController {
  constructor(private readonly airportsService: AirportsService) {}

  /*
  Get all airports
   */
  @Get()
  async findAll(): Promise<ApiResponse<AirportDTO[]>> {
    return {
      data: await this.airportsService.findAll(),
    };
  }

  /**
   * Get an specific airport by its IATA code
   * @param iata
   */
  @Get('iata/:iata')
  async findByIATA(@Param('iata') iata: string): Promise<ApiResponse<AirportDTO>> {
    const airport = await this.airportsService.findByIATA(iata);
    if (airport)
      return { data: airport, };
    else
      throw new NotFoundException(`An airport with IATA code ${iata} was not found`);
  }

  /**
   * Get an specific airport by its ICAO code
   * @param icao
   */
  @Get('icao/:icao')
  async findByICAO(@Param('icao') icao: string): Promise<ApiResponse<AirportDTO>> {
    const airport = await this.airportsService.findByICAO(icao);
    if (airport)
      return { data: airport, };
    else
      throw new NotFoundException(`An airport with ICAO code ${icao} was not found`);
  }
}
