export interface MoviesResponse {
	docs: MovieResponse[];
	page: number;
	pages: number;
	limit: number;
	total: number;
}

export interface MovieResponse {
	id: number;
	poster: {
		previewUrl: string;
	};
	genres: {
		name: string;
	}[];
	rating: {
		kp: number;
		imdb: number;
	};
	name: string;
	shortDescription: string;
	year: number;
}

export interface Movie {
	id: number;
	previewUrl: string;
	genres: {
		name: string;
	}[];
	rating: {
		kp: number;
		imdb: number;
	};
	name: string;
	shortDescription: string;
	year: number;
}
