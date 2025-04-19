import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
// для генерації токенів
import { randomBytes } from 'node:crypto';
import UserCollection from '../db/models/User.js';
import SessionCollection from '../db/models/Session.js';
import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/auth.js';

export const registerUser = async (payload) => {
  const { email, password } = payload;
  // Шукаємо користувача в базі за email, якщо є, то
  // викидаємо помилку зі статусом і текстом помилки
  const user = await UserCollection.findOne({ email }); // поверне null або object
  // console.log(Boolean([])); // true

  if (user) {
    throw createHttpError(409, 'Email already in use');
  }

  // хешуємо пароль, який передає користувач
  const hashPassword = await bcrypt.hash(password, 10);

  // Створюємо нового користувача і зберігаємо його
  // у базі разом із захешованим паролем
  return await UserCollection.create({
    ...payload,
    password: hashPassword,
  });
};

// напишемо логіку login
export const loginUser = async (payload) => {
  const { email, password } = payload;

  // перед тим, як людину логінити потрібно провести ряд перевірок
  const user = await UserCollection.findOne({ email });

  // якщо немає користувача з таким email у базі
  if (!user) {
    throw createHttpError(401, 'Email or password invalid');
  }

  // перевіряємо паролі
  const passwordCompare = await bcrypt.compare(password, user.password);

  // якщо пароль невірний
  if (!passwordCompare) {
    throw createHttpError(401, 'Email or password invalid');
  }

  // видалення попередньої сесії
  // розлогінення користувача на тому пристрої, де він був залогінений,
  // перед новим логіном на новому пристрої
  await SessionCollection.findOneAndDelete({ userId: user._id });

  // згенеруємо токени
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  // створюємо нову сесію
  return SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: Date.now() + accessTokenLifeTime,
    refreshTokenValidUntil: Date.now() + refreshTokenLifeTime,
  });
};
