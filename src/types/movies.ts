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

export interface MovieByIdResponse extends Movie {
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
