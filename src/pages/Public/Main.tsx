import { useEffect, useState } from 'react';

import { moviesAPI } from 'services/moviesService';

import MovieCard from 'components/MovieCard';
import Preloader from 'components/Preloader';
import Pagination from 'components/Pagination';

import InputField from 'elements/InputField';
import SelectField from 'elements/SelectField';

import SearchSvg from 'assets/icons/search.svg';

const limit = 10;

const Main = () => {
	const [page, setPage] = useState(1);

	const { data, isLoading, isFetching } = moviesAPI.useFetchAllMoviesQuery({
		page,
		limit,
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [page]);

	return (
		<>
			{(isLoading || isFetching) && <Preloader />}
			<main className="mx-auto bg-white w-[1200px] p-10 my-28 rounded-2xl">
				<div className="w-full flex justify-between items-center">
					<div className="w-full mr-5">
						<InputField
							name="search"
							type="text"
							icon={SearchSvg}
							label="Поиск"
						/>
					</div>

					<div className="mr-5 w-[170px]">
						<SelectField label="Год" value={'Все годы'} />
					</div>

					<div className="w-[200px]">
						<SelectField label="Жанр" value={'Все жанры'} />
					</div>
				</div>

				<div className="mt-10 flex justify-between flex-wrap">
					{data?.data.map((item) => (
						<MovieCard key={item.id} movie={item} />
					))}
				</div>

				{data?.data && <Pagination pagesCount={data.pages} setPage={setPage} />}
			</main>
		</>
	);
};

export default Main;
