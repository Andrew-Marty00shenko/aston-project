import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { moviesAPI } from 'services/moviesService';

import MovieCard from 'components/MovieCard';
import Pagination from 'components/Pagination';
import Preloader from 'components/Preloader';
import SearchPanel from 'components/SearchPanel';

const limit = 10;

const Search = () => {
	const [page, setPage] = useState(1);
	const [searchParams] = useSearchParams();
	const {
		data: movies,
		isLoading,
		isFetching,
	} = moviesAPI.useFetchMovieByQueryQuery({
		name: searchParams.get('name') as string,
		page,
		limit,
	});

	if (isLoading || !movies?.docs) {
		return <Preloader />;
	}

	return (
		<>
			{isFetching && <Preloader />}
			<main className="mx-auto bg-white w-[1200px] p-10 my-28 rounded-2xl">
				<SearchPanel />

				<h2 className="text-2xl font-bold mt-5">
					Результаты поиска по запросу{' '}
					<span className="text-orange">{searchParams.get('name')}</span>:{' '}
				</h2>
				<div className="mt-10 flex justify-between flex-wrap">
					{movies.docs.map((item) => (
						<MovieCard key={item.id} movie={item} />
					))}
				</div>

				{movies.docs && (
					<Pagination pagesCount={movies.pages} setPage={setPage} />
				)}
			</main>
		</>
	);
};

export default Search;
