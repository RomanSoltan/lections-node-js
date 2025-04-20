import createHttpError from 'http-errors';
import { findSession, findUser } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  // const { authorization } = req.headers;
  const authorization = req.get('Authorization');

  // якщо взагалі немає заголовку
  if (!authorization) {
    return next(createHttpError(401, 'Authorization header missing'));
  }

  // якщо приходить undefined, то не можна викликати метод split
  const [bearer, accessToken] = authorization.split(' ');

  // якщо перше слово не Bearer
  if (bearer !== 'Bearer') {
    return next(createHttpError(401, 'Header must have type Bearer'));
  }

  // перевірка чи є в сесії такий токен
  const session = await findSession({ accessToken });

  // якщо немає токену
  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  // перевірка часу життя токену доступу
  if (session.accessTokenValidUntil < Date.now()) {
    return next(createHttpError(401, 'Access token expired'));
  }

  // перевірка за id чи є такий юзер, який зберігається в сесії
  const user = await findUser({ _id: session.userId });
  if (!user) {
    return next(createHttpError(401, 'User not found(authenticate)'));
  }

  // запишемо у req.user інформацію про користувача, який робить запит,
  // для того щоб отримати його і використати у будь-якому місці
  req.user = user;

  next();
};
