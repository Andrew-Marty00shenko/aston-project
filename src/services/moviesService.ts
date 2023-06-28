import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Movies } from 'types/movies.type';

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
		fetchAllMovies: build.query<Movies, { page: number; limit: number }>({
			query: ({ page, limit }) => ({
				url: `movie?page=${page}&limit=${limit}`,
			}),
		}),
	}),
});
