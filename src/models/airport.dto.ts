
import { IsString, IsInt, IsDecimal, Length } from 'class-validator';
import { Airport } from './airport.entity';

export class AirportDTO implements Readonly<AirportDTO> {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsString()
  @Length(3, 3)
  IATA: string;

  @IsString()
  @Length(4, 4)
  ICAO: string;

  @IsDecimal()
  latitude: number;

  @IsDecimal()
  longitude: number;

  @IsDecimal()
  altitude: number;

  @IsInt()
  timezone: number;

  @IsString()
  @Length(1, 1)
  dst: number;

  @IsString()
  type: string;

  @IsString()
  source: string;

  static from(dto: Partial<AirportDTO>) {
    const airport = new AirportDTO();
    airport.id = dto.id;
    airport.name = dto.name;
    airport.city = dto.city;
    airport.country = dto.country;
    airport.IATA = dto.IATA;
    airport.ICAO = dto.ICAO;
    airport.latitude = dto.latitude;
    airport.longitude = dto.longitude;
    airport.altitude = dto.altitude;
    airport.timezone = dto.timezone;
    airport.dst = dto.dst;
    airport.type = dto.type;
    airport.source = dto.source;
    return airport;
  }

  static fromEntity(entity: Airport) {
    return this.from({
      id: entity.id,
      name: entity.name,
      city: entity.city,
      country: entity.country,
      IATA: entity.iata,
      ICAO: entity.icao,
      latitude: entity.latitude,
      longitude: entity.longitude,
      altitude: entity.altitude,
      timezone: entity.timezone,
      dst: entity.dst,
      type: entity.type,
      source: entity.source,
    });
  }

  toEntity() {
    const airport = new Airport();
    airport.id = this.id;
    airport.name = this.name;
    airport.city = this.city;
    airport.country = this.country;
    airport.iata = this.IATA;
    airport.icao = this.ICAO;
    airport.latitude = this.latitude;
    airport.longitude = this.longitude;
    airport.altitude = this.altitude;
    airport.timezone = this.timezone;
    airport.dst = this.dst;
    airport.type = this.type;
    airport.source = this.source;
    return airport;
  }
}
