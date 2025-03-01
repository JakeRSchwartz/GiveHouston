import express from 'express';
import cors from 'cors';
import { MikroORM, RequestContext } from '@mikro-orm/core';
import { __prod__ } from './constants';
import microConfig from '../mikro-orm.config';
import RegisterRoutes from './routes/register.routes';

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();
  const PORT = 3000;
  app.get('/', (req, res) => {
    res.send('Hello World');
  });
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
  });

  // Routes 
  app.use('/register', RegisterRoutes); 

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};
main().catch(err => {
  console.error(err);
});
