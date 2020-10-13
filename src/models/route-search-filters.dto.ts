
import { IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class RouteSearchFiltersDTO implements Readonly<RouteSearchFiltersDTO> {
  @IsBoolean()
  @Transform(value => Number(value) === 1)
  full = false;

  static from(dto: Partial<RouteSearchFiltersDTO>): RouteSearchFiltersDTO {
    const routeFindDTO = new RouteSearchFiltersDTO();
    routeFindDTO.full = dto.full;
    return routeFindDTO
  }
}
