
import { IsString, IsDecimal, Length } from 'class-validator';

import { Route } from './route.entity';
import { Airport } from './airport.entity';
import { AirportDTO } from './airport.dto';

export class RouteDTO implements Readonly<RouteDTO> {
  @IsString()
  @Length(7, 7)
  code: string;

  @IsDecimal()
  distance: string;

  @IsString()
  @Length(3, 3)
  originIata!: string;

  @IsString()
  @Length(3, 3)
  destinationIata!: string;

  origin?: AirportDTO;
  destination?: AirportDTO;

  static from(dto: Partial<RouteDTO>) {
    const route = new RouteDTO();
    route.code = dto.code;
    route.distance = dto.distance;
    route.originIata = dto.originIata;
    route.destinationIata = dto.destinationIata;
    route.origin = dto.origin;
    route.destination = dto.destination;
    return route;
  }

  static fromEntity(entity: Route) {
    return this.from({
      code: entity.code,
      distance: entity.distance,
      originIata: entity.originIata,
      destinationIata: entity.destinationIata,
      origin: entity.origin ? AirportDTO.fromEntity(entity.origin) : undefined,
      destination: entity.destination ? AirportDTO.fromEntity(entity.destination) : undefined,
    });
  }

  toEntity() {
    const route = new Route();
    route.code = this.code;
    route.distance = this.distance;
    route.originIata = this.originIata;
    route.destinationIata = this.destinationIata;
    route.origin = this.origin ? this.origin.toEntity() : undefined;
    route.destination = this.destination ? this.destination.toEntity() : undefined;
    return route;
  }
}
