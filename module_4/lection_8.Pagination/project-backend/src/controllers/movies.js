import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseMovieFilterParams } from '../utils/filters/parseMovieFilterParams.js';
import { movieSortFields } from '../db/models/Movie.js';
import {
  addMovie,
  deleteMovieById,
  getMovieById,
  getMovies,
  updateMovie,
} from '../services/movies.js';

export const getMoviesController = async (req, res) => {
  // отримаємо значення queryParams, те що йде після ? у запиті
  // пагінація
  const paginationParams = parsePaginationParams(req.query);

  // сортування
  const sortParams = parseSortParams(req.query, movieSortFields);

  // фільтрація
  const filters = parseMovieFilterParams(req.query);

  // робимо запит до колекції
  const data = await getMovies({
    ...paginationParams,
    ...sortParams,
    filters,
  });

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

export const addMovieController = async (req, res) => {
  // console.log(req.body);
  const data = await addMovie(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully add movie',
    data,
  });
};

export const upsertMovieController = async (req, res) => {
  const { id } = req.params;
  // якщо не передамо { upsert: true } третім аргументом і передамо id,
  // якого немає, то при запиті повернеться null
  const { data, isNew } = await updateMovie(id, req.body, { upsert: true });
  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upsert movie',
    data,
  });
};

export const patchMovieController = async (req, res) => {
  const { id } = req.params;
  const result = await updateMovie(id, req.body);

  if (!result) {
    throw createHttpError(404, `Movie with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully update movie',
    data: result.data,
  });
};

export const deleteMovieCotroller = async (req, res) => {
  const { id } = req.params;

  const data = await deleteMovieById(id);

  if (!data) {
    throw createHttpError(404, `Movie with id=${id} not found`);
  }

  res.status(204).send();
};
