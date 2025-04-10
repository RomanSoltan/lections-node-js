import { Router } from 'express';
import {
  getMoviesController,
  getMovieByIdController,
  addMovieController,
  upsertMovieController,
  patchMovieController,
  deleteMovieCotroller,
} from '../controllers/movies.js ';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { movieAddSchema, movieUpdateSchema } from '../validation/movies.js';

// створимо обєкт, який зберігатиме маршрути
const moviesRouter = Router();

moviesRouter.get('/', ctrlWrapper(getMoviesController));

moviesRouter.get('/:id', ctrlWrapper(getMovieByIdController));

moviesRouter.post(
  '/',

  ctrlWrapper(addMovieController),
);

moviesRouter.put(
  '/:id',
  validateBody(movieAddSchema),
  ctrlWrapper(upsertMovieController),
);

moviesRouter.patch(
  '/:id',
  validateBody(movieUpdateSchema),
  ctrlWrapper(patchMovieController),
);

moviesRouter.delete('/:id', ctrlWrapper(deleteMovieCotroller));

export default moviesRouter;
