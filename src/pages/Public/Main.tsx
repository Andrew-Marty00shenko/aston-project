import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { moviesAPI } from 'services/moviesService';

import { getMovies } from 'utils/helpers/filterMovies';

import SelectField from 'elements/SelectField';

import MovieCard from 'components/MovieCard';
import Preloader from 'components/Preloader';
import Pagination from 'components/Pagination';
import SearchPanel from 'components/SearchPanel';

const limit = 10;

const yearsList: string[] = [
	'все годы',
	'2023',
	'2022',
	'2021',
	'2020',
	'2019',
	'2018',
];
const genresList: string[] = [
	'все жанры',
	'комедия',
	'боевик',
	'ужасы',
	'детектив',
	'триллер',
	'фэнтези',
];

interface FiltersForm {
	year: string;
	genres: string;
}

const Main = () => {
	const { register, watch } = useForm<FiltersForm>();
	const { year, genres } = watch();
	const [page, setPage] = useState(1);

	const [trigger, { data, isLoading, isFetching }] =
		moviesAPI.useLazyFetchAllMoviesQuery();

	useEffect(() => {
		getMovies(trigger, { page, limit, year, genres });
	}, [page, year, genres]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [page, year, genres]);

	if (isLoading || !data?.docs) {
		return <Preloader />;
	}

	return (
		<>
			{isFetching && <Preloader />}
			<main className="mx-auto bg-white w-[1200px] p-10 my-28 rounded-2xl">
				<SearchPanel />

				<div className="mt-5 flex justify-between">
					<div className="w-[40%]">
						<SelectField
							name="year"
							label="Год"
							register={register}
							items={yearsList}
						/>
					</div>

					<div className="w-[40%]">
						<SelectField
							name="genres"
							label="Жанр"
							register={register}
							items={genresList}
						/>
					</div>
				</div>

				<div className="mt-10 flex justify-between flex-wrap">
					{data.docs.map((item) => (
						<MovieCard key={item.id} movie={item} />
					))}
				</div>

				{data.docs && <Pagination pagesCount={data.pages} setPage={setPage} />}
			</main>
		</>
	);
};

export default Main;
