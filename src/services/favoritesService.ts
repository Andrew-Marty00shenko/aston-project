import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { toMoviesArray } from './transformResponses/favoritesTransformResponse';

import type { Movie } from 'types/movies';

export const favoritesAPI = createApi({
	reducerPath: 'favoritesAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://aston-movies-default-rtdb.firebaseio.com/',
	}),
	tagTypes: ['Favorites'],
	endpoints: (build) => ({
		getFavoritesMovies: build.query<Movie[], { uid: string; token: string }>({
			query: ({ uid, token }) => ({
				url: `${uid}/favorites.json`,
				params: { auth: token },
			}),
			transformResponse: toMoviesArray,
			providesTags: ['Favorites'],
		}),
		addMovie: build.mutation<
			Movie,
			{ uid: string; token: string; movie: Movie }
		>({
			query: ({ uid, token, movie }) => ({
				url: `${uid}/favorites.json`,
				params: { auth: token },
				method: 'POST',
				body: movie,
			}),
			invalidatesTags: ['Favorites'],
		}),
	}),
});
