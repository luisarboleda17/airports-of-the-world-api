
import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { Like } from 'typeorm';

import { AirportsListQueryFilter } from './airports-list-query-filter';

export class AirportsListDTO implements Readonly<AirportsListDTO> {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsBoolean()
  @Transform(value => Number(value) === 1)
  fullMatch = true;

  static from(dto: Partial<AirportsListDTO>): AirportsListDTO {
    const airportsListDTO = new AirportsListDTO();
    airportsListDTO.name = dto.name;
    airportsListDTO.city = dto.city;
    airportsListDTO.country = dto.country;
    return airportsListDTO
  }

  toQueryFilter(): AirportsListQueryFilter[] {
    const filters: AirportsListQueryFilter[] = [];
    if (this.name)
      filters.push({ name: this.fullMatch ? this.name : Like(`%${this.name}%`) });
    if (this.city)
      filters.push({ city: this.fullMatch ? this.city : Like(`%${this.city}%`) });
    if (this.country)
      filters.push({ country: this.fullMatch ? this.country : Like(`%${this.country}%`) });
    return filters;
  }
}

