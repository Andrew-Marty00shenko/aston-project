import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	createApi,
	fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query/react';

import { toMoviesArray } from './transformResponses/favoritesTransformResponse';

import type { Movie } from 'types/movies';
import type { RootState } from 'redux/store';

const rawBaseQuery = fetchBaseQuery({
	baseUrl: 'https://aston-movies-default-rtdb.firebaseio.com/',
});

const dynamicBaseQuery: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const {
		auth: { token, uid },
	} = api.getState() as RootState;

	if (!uid || !token) {
		return {
			error: {
				status: 400,
				statusText: 'Bad Request',
				data: 'No token or uid',
			},
		};
	}

	const urlEnd = typeof args === 'string' ? args : args.url;
	const adjustedUrl = `${uid}/${urlEnd}?auth=${token}`;
	const adjustedArgs =
		typeof args === 'string' ? adjustedUrl : { ...args, url: adjustedUrl };

	return rawBaseQuery(adjustedArgs, api, extraOptions);
};

export const favoritesAPI = createApi({
	reducerPath: 'favoritesAPI',
	baseQuery: dynamicBaseQuery,
	tagTypes: ['Favorites'],
	endpoints: (build) => ({
		getFavoritesMovies: build.query<Movie[], void>({
			query: () => ({
				url: `favorites.json`,
			}),
			transformResponse: toMoviesArray,
			providesTags: ['Favorites'],
		}),
		addMovie: build.mutation<Movie, { movie: Movie }>({
			query: ({ movie }) => ({
				url: `favorites.json`,
				method: 'POST',
				body: movie,
			}),
			invalidatesTags: ['Favorites'],
		}),
		removeMovie: build.mutation<void, { movieKey: string }>({
			query: ({ movieKey }) => ({
				url: `favorites/${movieKey}.json`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Favorites'],
		}),
		removeAllFavorites: build.mutation<void, void>({
			query: () => ({
				url: `favorites.json`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Favorites'],
		}),
	}),
});
