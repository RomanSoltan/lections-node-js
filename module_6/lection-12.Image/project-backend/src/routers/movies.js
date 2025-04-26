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
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../utils/validateBody.js';
import { movieAddSchema, movieUpdateSchema } from '../validation/movies.js';
import { upload } from '../middlewares/multer.js';

// створимо обєкт, який зберігатиме маршрути
const moviesRouter = Router();

moviesRouter.use(authenticate); // uncomment in the end

moviesRouter.get('/', ctrlWrapper(getMoviesController));

moviesRouter.get('/:id', isValidId, ctrlWrapper(getMovieByIdController));

moviesRouter.post(
  '/',
  validateBody(movieAddSchema),
  ctrlWrapper(addMovieController),
);

moviesRouter.put(
  '/:id',
  isValidId,
  validateBody(movieAddSchema),
  ctrlWrapper(upsertMovieController),
);

moviesRouter.patch(
  '/:id',
  isValidId,
  upload.single('posterUrl'),
  validateBody(movieUpdateSchema),
  ctrlWrapper(patchMovieController),
);

moviesRouter.delete('/:id', isValidId, ctrlWrapper(deleteMovieCotroller));

export default moviesRouter;
