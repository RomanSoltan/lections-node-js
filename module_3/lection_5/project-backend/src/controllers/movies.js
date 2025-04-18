import createHttpError from 'http-errors';
import { getMovieById, getMovies } from '../services/movies.js';

export const getMoviesController = async (req, res) => {
  // робимо запит до колекції
  const data = await getMovies();

  res.json({
    status: 200,
    message: 'Successfully find movies!',
    data,
  });
};

export const getMovieByIdController = async (req, res) => {
  // витягнемо id з req, де він зберігається
  const { id } = req.params;
  const data = await getMovieById(id);

  if (!data) {
    throw createHttpError(404, `Movie with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully find movie with id=${id}!`,
    data,
  });
};

// Замість того, щоб в кожному catch передавати відповідь з помилкою,
// можна помилку передати в next() і тоді express буде шукати обробник
// помилок, обробником помилок express вважає middleware, і якому є
// 4 параметри, де викликає функцію, куди першим аргументом передає помилку
