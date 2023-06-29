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
		url: string;
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

export interface MovieByIdResponse extends MovieResponse {
	description: string;
	alternativeName: string;
	ageRating: number;
	countries: {
		name: string;
	}[];
	fees: {
		russia: {
			currency: string;
			value: number;
		};
		world: {
			currency: string;
			value: number;
		};
	};
	watchability: {
		items: {
			logo: {
				url: string;
			};
			name: string;
			url: string;
		}[];
	};
}

export interface MovieById extends Movie {
	description: string;
	alternativeName: string;
	ageRating: number;
	url: string;
	countries: {
		name: string;
	}[];
	feesRussia: {
		currency: string;
		value: number;
	};
	feesWorld: {
		currency: string;
		value: number;
	};
	watchability: {
		items: {
			linkIcon: string;
			name: string;
			url: string;
		}[];
	};
}
