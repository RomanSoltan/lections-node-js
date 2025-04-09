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

// створимо обєкт, який зберігатиме маршрути
const moviesRouter = Router();

moviesRouter.get('/', ctrlWrapper(getMoviesController));

moviesRouter.get('/:id', ctrlWrapper(getMovieByIdController));

moviesRouter.post('/', ctrlWrapper(addMovieController));

moviesRouter.put('/:id', ctrlWrapper(upsertMovieController));

moviesRouter.patch('/:id', ctrlWrapper(patchMovieController));

moviesRouter.delete('/:id', ctrlWrapper(deleteMovieCotroller));

export default moviesRouter;
