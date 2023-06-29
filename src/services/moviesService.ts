import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

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
			transformResponse: (responseData: MoviesResponse) => {
				const { total, page, pages, limit } = responseData;

				const data = responseData.docs.map((item) => {
					return { ...item, previewUrl: item.poster.previewUrl };
				});

				return {
					total,
					page,
					pages,
					limit,
					data,
				};
			},
		}),
		fetchMovieById: build.query({
			query: (params: { movieId: number }) => ({
				url: `movie/${params.movieId}`,
			}),
			transformResponse: (responseData: MovieByIdResponse) => {
				const {
					poster,
					genres,
					rating,
					name,
					alternativeName,
					year,
					description,
					ageRating,
					countries,
					fees,
					watchability,
				} = responseData;

				return {
					url: poster.url,
					genres,
					rating,
					name,
					alternativeName,
					year,
					description,
					ageRating,
					countries,
					feesRussia: fees.russia,
					feesWorld: fees.world,
					watchability: watchability.items.map((item) => {
						return {
							linkIcon: item.logo.url,
							name: item.name,
							url: item.url,
						};
					}),
				};
			},
		}),
	}),
});