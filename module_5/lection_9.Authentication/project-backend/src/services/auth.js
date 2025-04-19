import createHttpError from 'http-errors';
import UserCollection from '../db/models/User.js';

export const registerUser = async (payload) => {
  const { email } = payload;
  // Шукаємо користувача в базі за email, якщо є, то
  // викидаємо помилку зі статусом і текстом помилки
  const user = await UserCollection.find({ email }); // поверне null або object
  if (user) {
    throw createHttpError(409, 'Email already in use');
  }

  // Створюємо нового користувача і зберігаємо у базі
  return await UserCollection.create(payload);
};
