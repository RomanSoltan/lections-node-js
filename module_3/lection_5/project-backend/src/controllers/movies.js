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
    return res.status(404).json({
      status: 404,
      message: `Movie with id=${id} not found`,
    });
  }

  res.json({
    status: 200,
    message: `Successfully find movie with id=${id}!`,
    data,
  });
};
