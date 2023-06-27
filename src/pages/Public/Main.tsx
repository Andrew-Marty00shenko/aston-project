import MovieCard from 'components/MovieCard';

import InputField from 'elements/InputField';

import SearchSvg from 'assets/icons/search.svg';
import SelectField from 'elements/SelectField';

const Main = () => {
	return (
		<main className="mx-auto bg-white w-[1200px] p-10 my-28 rounded-2xl">
			<div className="w-full flex justify-between items-center">
				<div className="w-full mr-5">
					<InputField type="text" icon={SearchSvg} label="Поиск" />
				</div>

				<div className="mr-5 w-[170px]">
					<SelectField label="Год" value={'Все годы'} />
				</div>

				<div className="w-[200px]">
					<SelectField label="Жанр" value={'Все жанры'} />
				</div>
			</div>

			<div className="mt-10">
				<MovieCard />
			</div>
		</main>
	);
};

export default Main;
