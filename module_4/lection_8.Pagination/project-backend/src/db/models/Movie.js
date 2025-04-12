import { Schema, model } from 'mongoose';
import { minReleaseYear, typeList } from '../../constants/movies.js';
import { handlerSaveError, setUpdateSettings } from './hooks.js';

// створимо Schema - описує обєкт як має виглядати в колекції movies
// обмеженя на рівні запитів до бази
// Schema перевіряє те, що ми зберігаємо в базу
const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Назва фільму обов'язкова"],
    },
    director: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      // значення за замовчуванням застосовується, коли поле не передали
      default: false,
      // щоб запобігти глюку і не зберегти null
      required: true,
    },
    type: {
      type: String,
      enum: typeList,
      default: typeList[0],
      required: true,
    },
    releaseYear: {
      type: Number,
      min: minReleaseYear,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

// метод post() означає, що перевірка відбувається після запиту до бази
// Цей запис означає, якщо після додавання виникла помилка, то виконай
// колбек функцію i додамо помилці статус
movieSchema.post('save', handlerSaveError);

// pre означає перед. Перед оновленням викличи колбек функцію
movieSchema.pre('findOneAndUpdate', setUpdateSettings);

// якщо під час оновлення сталася валідація, теж викличи цю функцію
movieSchema.post('findOneAndUpdate', handlerSaveError);

// створимо масив полів, який можна використати при сортуванні
export const movieSortFields = [
  'title',
  'director',
  'favorite',
  'type',
  'releaseYear',
];

// створимо модель - це клас, який зєднаний з колекцією movies
// якщо такої колекції не буде mongoose її створить
// 1-й арумент - назва колекції до якої потрібно підєднатися
// 2-й аргумент - схема
const MovieCollection = model('movie', movieSchema);
// cathegory => cathegories
// mouse => mice

export default MovieCollection;
