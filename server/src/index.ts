import express from 'express';
import cors from 'cors';
import { __prod__ } from './constants';
import RegisterRoutes from './routes/register.routes';
import AuthRoutes from './routes/auth.routes';
import { initDI } from './middleware/di';
import { initORM } from './middleware/orm';
import cookieParsar from 'cookie-parser';

const main = async () => {
  const orm = await initORM();
  await initDI(orm);

  await orm.getMigrator().up();

  const app = express();
  const PORT = 3000;
  app.get('/', (req, res) => {
    res.send('Hello World');
  });
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParsar());

  // Routes
  app.use('/register', RegisterRoutes);
  app.use('/auth', AuthRoutes); 

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};
main().catch(err => {
  console.error(err);
});
