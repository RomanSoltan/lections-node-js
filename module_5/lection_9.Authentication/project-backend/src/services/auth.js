import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import UserCollection from '../db/models/User.js';

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
