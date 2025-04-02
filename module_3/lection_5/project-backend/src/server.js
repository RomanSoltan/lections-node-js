import express from 'express';
import cors from 'cors';

import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import moviesRouter from './routers/movies.js';
import { getEnvVar } from './utils/getEnvVar.js';

export const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  // app.use(logger);

  // застосуємо middleware moviesRouter до всіх запитів, які починаються з адреси '/movies'
  // рядок читається так. Коли прийде будь-який запит, який починається з /movies,
  // шукай його обробник у обєкті moviesRouter
  app.use('/movies', moviesRouter);

  // middleware, коли немає такої адреси
  app.use(notFoundHandler);

  // middleware для обробки помилок
  app.use(errorHandler);

  // проект буде запускатися на тому порті, який вільний
  // process.env - це налаштування серверу
  const port = Number(getEnvVar('PORT', 3000));

  app.listen(port, () => console.log(`Server running on ${port} port`));
};
