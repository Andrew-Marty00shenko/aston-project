import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { historyAPI } from 'services/historyService';
import { moviesAPI } from 'services/moviesService';

import { useOutside } from 'hooks/useOutside';
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
	const suggestsRef = useRef<HTMLDivElement>(null);
	const { register, watch, handleSubmit } = useForm<SearchForm>();
	const { search } = watch();
	const debouncedSearch = useDebounce(search, 500);
	const [trigger, { data: movies }] = moviesAPI.useLazyFetchMovieByQueryQuery();
	const [addMovieToHistory] = historyAPI.useCreateHistoryMutation();

	const [showSuggests, setShowSuggests] = useState(true);

	useEffect(() => {
		if (debouncedSearch !== undefined && debouncedSearch !== '') {
			trigger({ name: debouncedSearch });
		}
	}, [debouncedSearch]);

	const clickOutside = () => {
		setShowSuggests(false);
	};

	useOutside(suggestsRef, clickOutside);

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

			{debouncedSearch && showSuggests && movies && (
				<div ref={suggestsRef}>
					<SuggestsMovies movies={movies.docs} />
				</div>
			)}
		</form>
	);
};

export default SearchPanel;
