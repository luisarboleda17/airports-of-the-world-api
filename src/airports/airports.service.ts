
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Airport } from '../models/airport.entity';
import { AirportDTO } from '../models/airport.dto';
import { PaginationDTO } from '../models/pagination.dto';
import { PaginationResultDTO } from '../models/pagination-result.dto';

@Injectable()
export class AirportsService {
  constructor(
    @InjectRepository(Airport)
    private readonly repository: Repository<Airport>,
  ) { }

  /**/
  async findAll(
    paginationDTO: PaginationDTO
  ): Promise<PaginationResultDTO<AirportDTO>> {
    const offset = (paginationDTO.page - 1) * paginationDTO.limit;
    const totalCount = await this.repository.count();
    const airports = await this.repository.createQueryBuilder()
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
