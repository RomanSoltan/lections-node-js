import MovieCollection from '../db/models/Movie.js';

// створимо функції, які будуть робити запити до бази
export const getMovies = () => MovieCollection.find();

export const getMovieById = (id) => MovieCollection.findOne({ _id: id });
