import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
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

  app.get('/', (req, res) => {
    res.json({
      message: 'Server start successfully!',
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
