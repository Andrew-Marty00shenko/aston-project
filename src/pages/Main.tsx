import { FC } from 'react';

import MovieCard from 'components/MovieCard';

import InputField from 'elements/InputField';

import SearchSvg from 'assets/icons/search.svg';

const Main: FC = () => {
	return (
		<main className="mx-auto bg-white w-[1200px] p-10 my-10 rounded-2xl">
			<div className="w-full">
				<InputField icon={SearchSvg} label="Поиск" />
			</div>

			<div className="mt-10">
				<MovieCard />
			</div>
		</main>
	);
};

export default Main;
