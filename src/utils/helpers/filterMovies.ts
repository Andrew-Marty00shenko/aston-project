interface TriggerProps {
	page?: number;
	limit?: number;
	year?: string;
	genres?: string;
}

export const getMovies = (
	trigger: ({ page, limit, year, genres }: TriggerProps) => void,
	{ page, limit, year, genres }: TriggerProps
) => {
	switch (true) {
		case year === 'все годы' && genres === 'все жанры':
			trigger({ page, limit });
			break;
		case year !== 'все годы' && genres !== 'все жанры':
			trigger({ page, limit, year, genres });
			break;
		case year !== 'все годы' && genres === 'все жанры':
			trigger({ page, limit, year });
			break;
		case year === 'все годы' && genres !== 'все жанры':
			trigger({ page, limit, genres });
			break;
		default:
			trigger({ page, limit });
	}
};
