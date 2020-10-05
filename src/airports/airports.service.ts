
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Airport } from '../models/airport.entity';
import { AirportDTO } from '../models/airport.dto';


@Injectable()
export class AirportsService {
  constructor(
    @InjectRepository(Airport)
    private readonly repository: Repository<Airport>,
  ) { }

  /*
  Get all airports
   */
  findAll(): Promise<AirportDTO[]> {
    return this.repository.find()
      .then(airports => airports.map(airport => AirportDTO.fromEntity(airport)));
  }

  /**
   * Get an specific airport by its id
   * @param id
   */
  find(id: string): Promise<AirportDTO> {
    return this.repository.findOne({
      where: { id, }
    })
      .then(airport => AirportDTO.fromEntity(airport));
  }
}
