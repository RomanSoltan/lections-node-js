import { Router } from 'express';
import {
  getMoviesController,
  getMovieByIdController,
} from '../controllers/movies.js ';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

// створимо обєкт, який зберігатиме маршрути
const moviesRouter = Router();

moviesRouter.get('/', ctrlWrapper(getMoviesController));

moviesRouter.get('/:id', ctrlWrapper(getMovieByIdController));

export default moviesRouter;
