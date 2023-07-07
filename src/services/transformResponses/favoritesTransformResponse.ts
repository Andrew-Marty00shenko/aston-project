import type { Movie, MoviesResponseFirebase } from 'types/movies';

export const toMoviesArray = (
	responseData: MoviesResponseFirebase
): Movie[] => {
	let movies: Movie[] = [];

	if (responseData) {
		movies = Object.entries(responseData).map((item) => ({
			key: item[0],
			...item[1],
		}));
	}

	return movies;
};
