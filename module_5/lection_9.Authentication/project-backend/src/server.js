import express from 'express';
import cors from 'cors';

// import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRouter from './routers/auth.js';
import moviesRouter from './routers/movies.js';
import { getEnvVar } from './utils/getEnvVar.js';

export const startServer = () => {
  const app = express();

  app.use(cors());

  // express.json() Перевіряє чи у запиті є заголовок Content-Type і чому він дорівнює.
  // Якщо Content-Type: application/json, то ця мідлевара бере це тіло запиту,
  // проускає це тіло через JSON.parse(), отримує масив або обєкт і записує в
  // reqvest.body.
  // Якщо з іншої причини у вас приходить тіло запиту у іншому форматі, то потрібно
  // створити іншу мідлвару
  app.use(express.json());
  // app.use(logger);

  // Коли прийде будь-який запит, який починається з /auth,
  // шукай його обробник у обєкті authRouter
  app.use('/auth', authRouter);
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
