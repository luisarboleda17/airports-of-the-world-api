import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { AirportsService } from './airports.service';

@Controller('airports')
export class AirportsController {
  constructor(private readonly airportsService: AirportsService) {}

  /*
  Get all airports
   */
  @Get()
  findAll(): any {
    return {
      data: this.airportsService.findAll(),
    };
  }

  /**
   * Get an specific airport by its id
   * @param id
   */
  @Get(':id')
  find(@Param('id') id: string): any {
    const airport = this.airportsService.find(id);
    if (airport)
      return { data: airport, };
    else
      throw new NotFoundException(`An airport with id ${id} was not found`);
  }
}
