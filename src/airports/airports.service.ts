
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Airport } from '../models/airport.entity';
import { AirportDTO } from '../models/airport.dto';
import { PaginationDTO } from '../models/pagination.dto';
import { PaginationResultDTO } from '../models/pagination-result.dto';
import { AirportsListDTO } from '../models/airports-list.dto';

@Injectable()
export class AirportsService {
  constructor(
    @InjectRepository(Airport)
    private readonly repository: Repository<Airport>,
  ) { }

  /**/
  async findAll(
    paginationDTO: PaginationDTO,
    airportsListDTO?: AirportsListDTO
  ): Promise<PaginationResultDTO<AirportDTO>> {
    const offset = (paginationDTO.page - 1) * paginationDTO.limit;
    const baseQuery = this.repository.createQueryBuilder()
      .where(airportsListDTO ? airportsListDTO.toQueryFilter() : null)
    const totalCount = await baseQuery.getCount();
    const airports = await baseQuery
      .orderBy('iata', 'ASC')
      .offset(offset)
      .limit(paginationDTO.limit)
      .getMany();

    return new PaginationResultDTO<AirportDTO>(
      airports.map(airport => airport ? AirportDTO.fromEntity(airport) : null),
      paginationDTO.page,
      paginationDTO.limit,
      totalCount,
    );
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
