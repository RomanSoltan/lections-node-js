import { Router } from 'express';
import { getMovieById, getMovies } from '../services/movies.js';

// створимо обєкт, який зберігатиме маршрути
const moviesRouter = Router();

moviesRouter.get('/', async (req, res) => {
  // робимо запит до колекції
  const data = await getMovies();

  res.json({
    status: 200,
    message: 'Successfully find movies!',
    data,
  });
});

moviesRouter.get('/:id', async (req, res) => {
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
});

export default moviesRouter;
