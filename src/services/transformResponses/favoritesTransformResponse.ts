import type { Movie, MoviesResponseFirebase } from 'types/movies';

export const toMoviesArray = (
	responseData: MoviesResponseFirebase
): Movie[] => {
	const movies: Movie[] = [];

	for (const key in responseData) {
		movies.push({ ...responseData[key], key });
	}

	return movies;
};
