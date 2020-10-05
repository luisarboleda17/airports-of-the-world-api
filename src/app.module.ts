
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AirportsController } from './airports/airports.controller';
import { AirportsService } from './airports/airports.service';
import { configService } from './config/config.service';
import { Airport } from './models/airport.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([Airport,]),
  ],
  controllers: [AppController, AirportsController],
  providers: [AirportsService],
})
export class AppModule {}
