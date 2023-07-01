import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { moviesAPI } from 'services/moviesService';

import MovieCard from 'components/MovieCard';
import Pagination from 'components/Pagination';
import Preloader from 'components/Preloader';

const limit = 10;

const Search = () => {
	const [page, setPage] = useState(1);
	const [searchParams] = useSearchParams();
	const {
		data: movies,
		isLoading,
		isFetching,
	} = moviesAPI.useFetchMovieByQueryQuery({
		name: searchParams.get('name'),
		page,
		limit,
	});

	if (isFetching || isLoading) {
		return <Preloader />;
	}

	return (
		<main className="mx-auto bg-white w-[1200px] p-10 my-28 rounded-2xl">
			<h2 className="text-2xl font-bold">Результаты поиска: </h2>
			<div className="mt-10 flex justify-between flex-wrap">
				{movies?.data.map((item) => (
					<MovieCard key={item.id} movie={item} />
				))}
			</div>

			{movies?.data && (
				<Pagination pagesCount={movies.pages} setPage={setPage} />
			)}
		</main>
	);
};

export default Search;
