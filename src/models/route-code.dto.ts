
import { IsString, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class RouteCodeDTO implements Readonly<RouteCodeDTO> {
  @IsString()
  @Length(7, 7)
  @Matches(/^[A-Za-z]{3}-[A-Za-z]{3}$/i)
  @Transform(value => value ? value.toUpperCase() : value)
  code: string;

  static from(dto: Partial<RouteCodeDTO>): RouteCodeDTO {
    const routeCodeDTO = new RouteCodeDTO();
    routeCodeDTO.code = dto.code;
    return routeCodeDTO;
  }
}
