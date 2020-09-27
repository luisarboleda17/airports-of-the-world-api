import { Injectable } from '@nestjs/common';

@Injectable()
export class AirportsService {
  /*
  Get all airports
   */
  findAll(): any {
    return [{
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
    }];
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
