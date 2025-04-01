import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getMovies, getMovieById } from './services/movies.js';
import { getEnvVar } from './utils/getEnvVar.js';

export const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.get('/api/movies', async (req, res) => {
    // робимо запит до колекції
    const data = await getMovies();

    res.json({
      status: 200,
      message: 'Successfully find movies!',
      data,
    });
  });

  app.get('/api/movies/:id', async (req, res) => {
    // витягнемо id з req, де він зберігається
    const { id } = req.params;
    const data = await getMovieById(id);

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `Movie with id=${id} not found`,
      });
    }

    res.json({
      status: 200,
      message: `Successfully find movie with id=${id}!`,
      data,
    });
  });

  // коли немає такої адреси
  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not foud`,
    });
  });

  // для обробки помилок
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: err.message,
    });
  });

  // проект буде запускатися на тому порті, який вільний
  // process.env - це налаштування серверу
  const port = Number(getEnvVar('PORT', 3000));

  app.listen(port, () => console.log(`Server running on ${port} port`));
};
