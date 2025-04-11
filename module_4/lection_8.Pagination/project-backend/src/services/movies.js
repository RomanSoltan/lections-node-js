// services роблять логіку
import MovieCollection from '../db/models/Movie.js';

// створимо функції, які будуть робити запити до бази
export const getMovies = async ({ page = 1, perPage = 10 }) => {
  // запросимо у бази значення
  // skip - це скільки пропустити обєктів спочатку колекції
  // limit - це скільки взяти
  const skip = (page - 1) * perPage;
  const result = await MovieCollection.find().skip(skip).limit(perPage);

  return result;
};

export const getMovieById = (id) => MovieCollection.findOne({ _id: id });

export const addMovie = (payload) => MovieCollection.create(payload);

export const updateMovie = async (_id, payload, options = {}) => {
  const { upsert } = options;
  // Щоб монгус оновлював обєкт і в базі даних і у відповідi із серверу,
  // тобто повертав оновлений обєкт, потрібно при виклику методу передати
  // третій аргумент налаштування запиту на оновлення,
  // a саме обєкт, де вказати {new: trueб runValidators: true}
  const rawResult = await MovieCollection.findOneAndUpdate({ _id }, payload, {
    // онови, якщо є, а якщо немає, то додай
    upsert,
    // повернеться розгорнутий варіант відповіді
    includeResultMetadata: true,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteMovieById = (_id) =>
  MovieCollection.findOneAndDelete({ _id });
