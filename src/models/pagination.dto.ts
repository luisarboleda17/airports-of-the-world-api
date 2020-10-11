
import { IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDTO implements Readonly<PaginationDTO> {
  @IsInt()
  @Transform(value => Number(value))
  page = 1;

  @IsInt()
  @Transform(value => Number(value))
  limit = 10;
}
