import { initMongoConnection } from './db/initMongoConnection.js';
import { startServer } from './server.js';

const bootstrap = async () => {
  // функцію підключення до бази потрібно викликати до запуску сервера
  await initMongoConnection();
  startServer();
};
bootstrap();
