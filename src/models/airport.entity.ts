
import { Entity, Column } from 'typeorm';

@Entity({ name: 'airport' })
export class Airport {
  @Column({ primary: true, type: 'varchar' })
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  country: string;

  @Column({ type: 'varchar', length: 3 })
  iata: string;

  @Column({ type: 'varchar', length: 4 })
  icao: string;

  @Column({ type: 'decimal' })
  latitude: string;

  @Column({ type: 'decimal' })
  longitude: string;

  @Column({ type: 'decimal' })
  altitude: string;

  @Column({ type: 'integer' })
  timezone: number;

  @Column({ type: 'varchar', length: 1 })
  dst: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'varchar' })
  source: string;
}
