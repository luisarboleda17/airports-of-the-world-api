
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AirportsController } from './airports/airports.controller';
import { AirportsService } from './airports/airports.service';

@Module({
  imports: [],
  controllers: [AppController, AirportsController],
  providers: [AirportsService],
})
export class AppModule {}
