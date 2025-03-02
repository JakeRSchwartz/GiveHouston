import { MikroORM, EntityManager } from '@mikro-orm/core';

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
};

// Function to initialize DI
export const initDI = async (orm: MikroORM) => {
  DI.orm = orm;
  DI.em = orm.em;
};
