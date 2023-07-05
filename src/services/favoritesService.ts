import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { toMoviesArray } from './transformResponses/favoritesTransformResponse';

import type { Movie } from 'types/movies';

export const favoritesAPI = createApi({
	reducerPath: 'favoritesAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://aston-movies-default-rtdb.firebaseio.com/',
	}),
	tagTypes: ['Favorites'],
	endpoints: (build) => {
		const { uid, token }: { uid: string; token: string } = JSON.parse(
			localStorage.getItem('user') as string
		);

		return {
			getFavoritesMovies: build.query<Movie[], void>({
				query: () => ({
					url: `${uid}/favorites.json`,
					params: { auth: token },
				}),
				transformResponse: toMoviesArray,
				providesTags: ['Favorites'],
			}),
			addMovie: build.mutation<Movie, { movie: Movie }>({
				query: ({ movie }) => ({
					url: `${uid}/favorites.json`,
					params: { auth: token },
					method: 'POST',
					body: movie,
				}),
				invalidatesTags: ['Favorites'],
			}),
			removeMovie: build.mutation<void, { movieKey: string }>({
				query: ({ movieKey }) => ({
					url: `${uid}/favorites/${movieKey}.json`,
					method: 'DELETE',
				}),
				invalidatesTags: ['Favorites'],
			}),
		};
	},
});
