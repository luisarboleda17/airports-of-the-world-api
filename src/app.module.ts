
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmConfigService } from './config/typeorm-config.service';
import { AppController } from './app.controller';
import { AirportsController } from './airports/airports.controller';
import { AirportsService } from './airports/airports.service';
import { Airport } from './models/airport.entity';

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
      Airport
    ]),
  ],
  controllers: [AppController, AirportsController],
  providers: [
    AirportsService,
  ],
})
export class AppModule {}
