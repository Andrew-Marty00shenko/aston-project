export interface Movies {
	docs: Movie[];
	page: number;
	pages: number;
	limit: number;
	total: number;
}

export interface Movie {
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
