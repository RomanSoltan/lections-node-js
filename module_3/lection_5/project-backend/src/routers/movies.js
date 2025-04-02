import { Router } from 'express';
import {
  getMoviesController,
  getMovieByIdController,
} from '../controllers/movies.js ';

// створимо обєкт, який зберігатиме маршрути
const moviesRouter = Router();

moviesRouter.get('/', getMoviesController);

moviesRouter.get('/:id', getMovieByIdController);

export default moviesRouter;
