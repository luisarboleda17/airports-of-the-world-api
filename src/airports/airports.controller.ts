
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
   * Get an specific airport by its id
   * @param id
   */
  @Get(':id')
  async find(@Param('id') id: string): Promise<ApiResponse<AirportDTO>> {
    const airport = await this.airportsService.find(id);
    if (airport)
      return { data: airport, };
    else
      throw new NotFoundException(`An airport with id ${id} was not found`);
  }
}
