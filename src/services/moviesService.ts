import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import {
	toAllMovies,
	toMovieById,
	toMovieByQuery,
} from './transformResponses/moviesTransfromResponse';

import type { MovieById, Movies } from 'types/movies';

export const moviesAPI = createApi({
	reducerPath: 'moviesAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.kinopoisk.dev/v1.3/',
		prepareHeaders: (headers) => {
			headers.set('X-API-KEY', process.env.REACT_APP_API_KEY_KP as string);
			return headers;
		},
	}),
	endpoints: (build) => ({
		fetchAllMovies: build.query<
			Movies,
			{ page?: number; limit?: number; year?: string; genres?: string }
		>({
			query: ({ page, limit, year, genres }) => ({
				url: `movie`,
				params: { page, limit, year, 'genres.name': genres },
			}),
			transformResponse: toAllMovies,
		}),
		fetchMovieById: build.query<MovieById, { movieId: number }>({
			query: ({ movieId }) => ({
				url: `movie/${movieId}`,
			}),
			transformResponse: toMovieById,
		}),
		fetchMovieByQuery: build.query<
			Movies,
			{ page?: number; limit?: number; name?: string }
		>({
			query: ({ page, limit, name }) => ({
				url: 'movie',
				params: { page, limit, name },
			}),
			transformResponse: toMovieByQuery,
		}),
	}),
});
