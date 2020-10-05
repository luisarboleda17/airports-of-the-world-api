
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
  find(id: string): any {
    if (id !== '1') return null;
    return {
      id:1,
      name: 'Goroka Airport',
      city: 'Goroka',
      country: 'Papua New Guinea',
      iata: 'GKA',
      icao: 'AYGA',
      latitude: -6.081689834590001,
      longitude: 145.391998291,
      altitude: 5282,
      timezone: 10,
      dst: 'U',
      databaseTimezone: 'Pacific/Port_Moresby',
      type: 'airport',
      source: 'OurAirports',
    };
  }
}
