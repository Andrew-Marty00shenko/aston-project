import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import {
	transformResponseFetchAllMovies,
	transformResponseFetchMovieById,
} from './transformResponses/moviesTransfromResponse';

import type { MovieByIdResponse, MoviesResponse } from 'types/movies';

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
		fetchAllMovies: build.query({
			query: (params: { page: number; limit: number }) => ({
				url: `movie?page=${params.page}&limit=${params.limit}`,
			}),
			transformResponse: (responseData: MoviesResponse) =>
				transformResponseFetchAllMovies(responseData),
		}),
		fetchMovieById: build.query({
			query: (params: { movieId: number }) => ({
				url: `movie/${params.movieId}`,
			}),
			transformResponse: (responseData: MovieByIdResponse) =>
				transformResponseFetchMovieById(responseData),
		}),
	}),
});
