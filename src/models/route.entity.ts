
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Airport } from './airport.entity';

@Entity({ name: 'route' })
export class Route {
  @Column({ primary: true, type: 'varchar', length: 7 })
  code: string;

  @Column({ type: 'decimal', nullable: false })
  distance: string;

  @Column({ nullable: false })
  originIata: string;

  @Column({ nullable: false })
  destinationIata: string;

  @ManyToOne(() => Airport, airport => airport.routes, { nullable: false })
  @JoinColumn()
  origin!: Airport;

  @ManyToOne(() => Airport, airport => airport.routes, { nullable: false })
  @JoinColumn()
  destination!: Airport;
}
