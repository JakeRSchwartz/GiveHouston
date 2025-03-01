import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { User } from './src/entities/user.entity';
import { __prod__ } from './src/constants';
import path from 'path';

export default {
  entities: [User],
  dbName: 'GiveHouston',
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  debug: !__prod__,
  migrations: {
    path: path.join(__dirname, './migrations')
  }
} as Parameters<typeof MikroORM.init>[0];
