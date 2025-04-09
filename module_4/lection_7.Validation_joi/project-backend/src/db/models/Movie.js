import { Schema, model } from 'mongoose';

// створимо Schema - описує обєкт як має виглядати в колекції movies
// обмеженя на рівні запитів до бази
const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
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
      enum: ['film', 'serial'],
      default: 'film',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

// створимо модель - це клас, який зєднаний з колекцією movies
// якщо такої колекції не буде mongoose її створить
// 1-й арумент - назва колекції до якої потрібно підєднатися
// 2-й аргумент - схема
const MovieCollection = model('movie', movieSchema);
// cathegory => cathegories
// mouse => mice

export default MovieCollection;
