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

// створимо нову сесію
const createSession = () => {
  // згенеруємо токени і час їх життя
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = Date.now() + accessTokenLifeTime;
  const refreshTokenValidUntil = Date.now() + refreshTokenLifeTime;

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};

// передаємо умову пошуку сесії і поверне або сесію, або null
export const findSession = (query) => SessionCollection.findOne(query);

// знайдемо юзера
export const findUser = (query) => UserCollection.findOne(query);

export const registerUser = async (payload) => {
  const { email, password } = payload;
  // Шукаємо користувача в базі за email
  const user = await UserCollection.findOne({ email }); // поверне null або object
  // console.log(Boolean([])); // true

  // якщо є користувач, то
  // викидаємо помилку зі статусом і текстом помилки
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
  const session = createSession();

  // створюємо нову сесію
  return SessionCollection.create({
    userId: user._id,
    ...session,
  });
};

export const refreshUser = async ({ refreshToken, sessionId }) => {
  // потрібно перевірити чи є така сесія з таким токеном і id
  const session = await findSession({ refreshToken, _id: sessionId });
  if (!session) {
    throw createHttpError(401, 'Session not found (refresh)');
  }

  // console.log(typeof session.refreshTokenValidUntil); // object

  // час життя refresh токена вичерпаний
  if (session.refreshTokenValidUntil < Date.now()) {
    // видаляємо стару сесію, якщо токен вмер
    await SessionCollection.findOneAndDelete({ _id: session._id });
    throw createHttpError(401, 'Session token expired');
  }

  // видаляємо стару сесію
  await SessionCollection.findOneAndDelete({ _id: session._id });

  //згенеруємо нову сесію і токени
  const newSession = createSession();

  // повертаємо на фронтенд нову сесію
  return SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const logoutUser = (sessionId) =>
  // видалення сесії
  SessionCollection.deleteOne({ _id: sessionId });
