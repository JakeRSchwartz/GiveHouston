import { MikroORM } from '@mikro-orm/core';
import mikroConfig from '../../mikro-orm.config';

export const initORM = async () => {
  const orm = await MikroORM.init(mikroConfig);
  return orm;
};

