
import { FindOperator } from 'typeorm';

export type AirportsListQueryFilter = {
  [K: string]: string | FindOperator<string>;
};
