
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
  ) { }

  isProduction(): boolean {
    return this.configService.get('ENV') === 'prod';
  }

  isTest(): boolean {
    return this.configService.get('ENV') === 'test';
  }

  useSSL(): boolean {
    return this.configService.get('DATABASE_USE_SSL') === '1';
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get('DATABASE_USER'),
      password: this.configService.get('DATABASE_PASSWORD'),
      database: this.configService.get('DATABASE_DATABASE'),
      entities: [ __dirname + '/../**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: [ __dirname + '/../migration/*.ts'],
      cli: {
        migrationsDir: 'src/migration',
      },
      extra: {
        ssl: {
          rejectUnauthorized: !this.isTest(),
        }
      },
      ssl: this.useSSL(),
    };
  }
}
