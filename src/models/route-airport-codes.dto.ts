
import { IsString, Length, Matches, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class RouteAirportCodesDTO implements Readonly<RouteAirportCodesDTO> {
  @IsString()
  @IsOptional()
  @Length(3, 3)
  @Matches(/^[A-Za-z]{3}$/)
  @Transform(value => value ? value.toUpperCase() : value)
  originIATACode: string;

  @IsString()
  @IsOptional()
  @Length(4, 4)
  @Matches(/^[A-Za-z]{4}$/)
  @Transform(value => value ? value.toUpperCase() : value)
  originICAOCode: string;

  @IsString()
  @IsOptional()
  @Length(3, 3)
  @Matches(/^[A-Za-z]{3}$/)
  @Transform(value => value ? value.toUpperCase() : value)
  destinationIATACode: string;

  @IsString()
  @IsOptional()
  @Length(4, 4)
  @Matches(/^[A-Za-z]{4}$/)
  @Transform(value => value ? value.toUpperCase() : value)
  destinationICAOCode: string;

  static from(dto: Partial<RouteAirportCodesDTO>): RouteAirportCodesDTO {
    const routeAirportCodesDTO = new RouteAirportCodesDTO();
    routeAirportCodesDTO.originIATACode = dto.originIATACode;
    routeAirportCodesDTO.originICAOCode = dto.originICAOCode;
    routeAirportCodesDTO.destinationIATACode = dto.destinationIATACode;
    routeAirportCodesDTO.destinationICAOCode = dto.destinationICAOCode;
    return routeAirportCodesDTO
  }

  getErrorMessage() {
    return `A route with origin ${this.getOriginCodeErrorMessage()} and destination ${this.getDestinationCodeErrorMessage()}`;
  }

  private getOriginCodeErrorMessage() {
    return RouteAirportCodesDTO.getAirportCodeErrorMessage(this.originIATACode, this.originICAOCode);
  }

  private getDestinationCodeErrorMessage() {
    return RouteAirportCodesDTO.getAirportCodeErrorMessage(this.originIATACode, this.originICAOCode);
  }

  private static getAirportCodeErrorMessage(iataCode: string, icaoCode: string): string {
    return iataCode ? `IATA code ${iataCode}` : `ICAO code ${icaoCode}`;
  }
}
