import { Link } from 'react-router-dom';

import { favoritesAPI } from 'services/favoritesService';

import MovieCard from 'components/MovieCard';
import Preloader from 'components/Preloader';

import TrashSvg from 'assets/icons/trash.svg';

const Favorites = () => {
	const { data, isLoading } = favoritesAPI.useGetFavoritesMoviesQuery();
	const [removeMovieFromFavorites] = favoritesAPI.useRemoveMovieMutation();

	if (isLoading || !data) {
		return <Preloader />;
	}

	const onRemoveMovieFromFavorites = (key: string) => {
		if (
			window.confirm('Вы уверены, что хотите удалить этот фильм из избранного?')
		) {
			removeMovieFromFavorites({ movieKey: key });
		}
	};

	return (
		<main className="mx-auto bg-white w-[1200px] p-10 my-28 rounded-2xl">
			<h2 className="text-2xl font-bold">Избранное: </h2>

			<div className="mt-10 flex justify-between flex-wrap">
				{data.length === 0 ? (
					<p>
						Здесь пока ничего нет.{' '}
						<Link className="underline text-orange" to="/">
							Перейти к выбору фильмов
						</Link>
					</p>
				) : (
					data.map((item) => (
						<MovieCard
							key={item.id}
							icon={TrashSvg}
							onClick={onRemoveMovieFromFavorites}
							movie={item}
						/>
					))
				)}
			</div>
		</main>
	);
};

export default Favorites;
