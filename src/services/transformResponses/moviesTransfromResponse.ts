import type { MovieById, MovieByIdResponse, Movies } from 'types/movies';

export const toAllMovies = (responseData: Movies): Movies => {
	const { total, page, pages, limit } = responseData;

	return {
		total,
		page,
		pages,
		limit,
		docs: responseData.docs.map((item) => {
			return {
				id: item.id,
				poster: item.poster,
				genres: item.genres,
				rating: item.rating,
				name: item.name,
				shortDescription: item.shortDescription,
				year: item.year,
			};
		}),
	};
};

export const toMovieById = (responseData: MovieByIdResponse): MovieById => {
	const {
		id,
		poster,
		genres,
		rating,
		name,
		shortDescription,
		year,
		description,
		alternativeName,
		ageRating,
		countries,
		fees,
		watchability,
	} = responseData;

	return {
		id,
		poster,
		genres,
		rating,
		name,
		alternativeName,
		year,
		shortDescription,
		description,
		ageRating,
		countries,
		feesRussia: fees.russia,
		feesWorld: fees.world,
		watchability: {
			items: watchability.items.map((item) => {
				return {
					linkIcon: item.logo.url,
					name: item.name,
					url: item.url,
				};
			}),
		},
	};
};

export const toMovieByQuery = (responseData: Movies): Movies => {
	const { total, page, pages, limit } = responseData;

	return {
		total,
		page,
		pages,
		limit,
		docs: responseData.docs.map((item) => {
			return {
				id: item.id,
				poster: item.poster,
				genres: item.genres,
				rating: item.rating,
				name: item.name,
				shortDescription: item.shortDescription,
				year: item.year,
			};
		}),
	};
};
