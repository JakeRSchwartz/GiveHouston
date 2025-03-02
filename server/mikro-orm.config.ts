import { MikroORM, EntityManager} from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { User } from './src/entities/user.entity';
import { __prod__ } from './src/constants';
import path from 'path';
import { Availability } from './src/entities/availability.entity';
import { Skill } from './src/entities/skill.entity';

export default {
  entities: [User, Availability, Skill], 
  dbName: 'GiveHouston', // rename to match your database name 
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  

  debug: !__prod__,
  migrations: {
    path: path.join(__dirname, './migrations')
  }
} as Parameters<typeof MikroORM.init>[0];
