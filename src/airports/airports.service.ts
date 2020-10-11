
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
   * Get an specific airport by its IATA code
   * @param iata
   */
  findByIATA(iata: string): Promise<AirportDTO> {
    return this.repository.findOne({
      where: { iata, }
    })
      .then(airport => airport ? AirportDTO.fromEntity(airport) : null);
  }

  /**
   * Get an specific airport by its ICAO code
   * @param icao
   */
  findByICAO(icao: string): Promise<AirportDTO> {
    return this.repository.findOne({
      where: { icao, }
    })
      .then(airport => airport ? AirportDTO.fromEntity(airport) : null);
  }
}
