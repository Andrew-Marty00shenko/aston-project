interface TriggerProps {
	page?: number;
	limit?: number;
	year?: string;
	genres?: string;
}

export const getMovies = ({ page, limit, year, genres }: TriggerProps) => {
	switch (true) {
		case year === 'все годы' && genres === 'все жанры':
			return {
				page,
				limit,
			};
		case year !== 'все годы' && genres !== 'все жанры':
			return { page, limit, year, genres };
		case year !== 'все годы' && genres === 'все жанры':
			return { page, limit, year };
		case year === 'все годы' && genres !== 'все жанры':
			return { page, limit, genres };
		default:
			return { page, limit };
	}
};
