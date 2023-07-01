import type { MovieByIdResponse, MoviesResponse } from 'types/movies';

export const transformResponseFetchAllMovies = (
	responseData: MoviesResponse
) => {
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
};

export const transformResponseFetchMovieById = (
	responseData: MovieByIdResponse
) => {
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
};

export const transformResponseFetchMovieByQuery = (
	responseData: MoviesResponse
) => {
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
};
