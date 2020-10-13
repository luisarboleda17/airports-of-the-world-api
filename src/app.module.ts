
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmConfigService } from './config/typeorm-config.service';
import { AppController } from './app.controller';
import { AirportsController } from './airports/airports.controller';
import { AirportsService } from './airports/airports.service';
import { Airport } from './models/airport.entity';
import { Route } from './models/route.entity';
import { RoutesService } from './routes/routes.service';
import { RoutesController } from './routes/routes.controller';

/**
 * Load environment file depends on environment
 */
export const getEnvironmentFile = () =>
  __dirname + '/../' + (process.env.ENV === 'test' ? '.test.env' : '.env');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvironmentFile(),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfigService
    }),
    TypeOrmModule.forFeature([
      Airport,
      Route,
    ]),
  ],
  controllers: [
    AppController,
    AirportsController,
    RoutesController,
  ],
  providers: [
    AirportsService,
    RoutesService,
  ],
})
export class AppModule {}
