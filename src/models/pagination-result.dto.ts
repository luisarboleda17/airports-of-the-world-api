
import { IsInt } from 'class-validator';

export class PaginationResultDTO<T> implements Readonly<PaginationResultDTO<T>> {
  data: T[];

  @IsInt()
  page: number;

  @IsInt()
  pages: number;

  @IsInt()
  limit: number;

  @IsInt()
  total: number;

  constructor(
    data: T[],
    page: number,
    limit: number,
    total: number,
  ) {
    this.data = data;
    this.page = page;
    this.pages = Math.ceil(total / limit) || 1;
    this.limit = limit;
    this.total = total;
  }
}
