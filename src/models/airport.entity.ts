
import { Entity, Column, Index, OneToMany } from 'typeorm';

import { Route } from './route.entity';

@Entity({ name: 'airport' })
export class Airport {
  @Column({ primary: true, type: 'varchar', length: 3 })
  iata: string;

  @Index()
  @Column({ type: 'varchar' })
  name: string;

  @Index()
  @Column({ type: 'varchar' })
  city: string;

  @Index()
  @Column({ type: 'varchar' })
  country: string;

  @Index({ unique: true })
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

  @OneToMany(() => Route, route => route.origin || route.destination)
  public routes!: Promise<Route[]>;
}
