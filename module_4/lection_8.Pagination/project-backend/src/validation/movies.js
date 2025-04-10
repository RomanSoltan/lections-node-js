import Joi from 'joi';
import { typeList } from '../constants/movies.js';

// створимо joi-схему, яка описує обєкт
// Joi перевіряє, те що прийшло з фронта
export const movieAddSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'Треба вказати назву фільму',
    'string.base': 'Назва фільму має бути рядком',
  }),
  director: Joi.string().required(),
  favorite: Joi.boolean(),
  type: Joi.string().valid(...typeList),
});

// схема для patch
export const movieUpdateSchema = Joi.object({
  title: Joi.string(),
  director: Joi.string(),
  favorite: Joi.boolean(),
  type: Joi.string().valid(...typeList),
});

// Є різниця між тим, що нам приходить і тим, що ми зберігаємо у базі данних.
// З точки зору беку і архітектури, це різні значення. Вони можуть співпадати,
// тобто поля і їх вміст, але це різні за сенсом дані. Те що нам надсилає
// фронт і те, що ми зберігаємо в базі, з допомогою моделі, це різні значення,
// тому і перевіряти ми їх маємо окремо. Для початку перевіримо те, що надішле
// фронт, тобто тіло запиту. Є Кілька способів, але більш популяним є перевірка
// з допомогою Joi, спеціальної бібліотеки

// console.log(error); // якщо запит успішний error буде undefined,
// якщо є помилка валідації, то покаже поле error

// Сама ідея валідації проста. В схемі movieAddSchema викликаємо
// метод validate, в який передаємо req.body, в результаті повертається
// обєкт. Якщо в результі перевірки є ключ error, то валідація не вдалась,
// і ми викидаємо помилку.
