
import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config();

export class ConfigService {
  constructor(
    private env: { [k: string]: string | undefined }
  ) { }

  /**
   * Get value from environment by key
   * @param key
   * @param throwOnMissing
   */
  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing)
      throw new Error(`Config error - missing env.${key}`);
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  /**
   * Get application port from environment variables
   */
  public getPort() {
    return this.getValue('PORT', true);
  }

  /**
   * Get API environment
   */
  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  /**
   * Get TypeORM configuration
   */
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: [__dirname + '/../migration/*.ts'],
      cli: {
        migrationsDir: 'src/migration',
      },
      ssl: this.isProduction(),
    };
  }
}

const configService = new ConfigService(process.env)
  .ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE'
  ]);

export { configService };
