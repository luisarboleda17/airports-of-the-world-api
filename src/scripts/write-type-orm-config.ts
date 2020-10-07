
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmConfigService } from '../config/typeorm-config.service';
import { getEnvironmentFile } from '../app.module';
import fs = require('fs');

/**
 * Load environment files
 */
ConfigModule.forRoot({
  envFilePath: getEnvironmentFile(),
});
const configService = new ConfigService();
const typeOrmConfigService = new TypeOrmConfigService(configService);

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(typeOrmConfigService.createTypeOrmOptions(), null, 2),
);
