import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { historyAPI } from 'services/historyService';
import { moviesAPI } from 'services/moviesService';

import { useDebounce } from 'hooks/useDebounce';

import SuggestsMovies from './SuggestsMovies';

import Button from 'elements/Button';
import InputField from 'elements/InputField';

import SearchSvg from 'assets/icons/search.svg';

interface SearchForm {
	search: string;
}

const SearchPanel = () => {
	const navigate = useNavigate();
	const { register, watch, handleSubmit } = useForm<SearchForm>();
	const { search } = watch();
	const debouncedSearch = useDebounce(search, 500);
	const [trigger, { data: movies }] = moviesAPI.useLazyFetchMovieByQueryQuery();
	const [addMovieToHistory] = historyAPI.useCreateHistoryMutation();

	useEffect(() => {
		if (debouncedSearch !== undefined) {
			trigger({ name: debouncedSearch });
		}
	}, [debouncedSearch]);

	const searchMovieByName = () => {
		addMovieToHistory({ name: debouncedSearch, createdAt: Date.now() });
		navigate(`/search?name=${debouncedSearch}`);
	};

	return (
		<form className="relative" onSubmit={handleSubmit(searchMovieByName)}>
			<div className="w-full flex justify-between">
				<div className="w-full">
					<InputField
						name="search"
						type="text"
						icon={SearchSvg}
						label="Поиск"
						register={register}
					/>
				</div>
				<div className="ml-5 flex flex-col justify-end">
					<Button>Найти</Button>
				</div>
			</div>

			{debouncedSearch && movies && <SuggestsMovies movies={movies.docs} />}
		</form>
	);
};

export default SearchPanel;
