import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { useAppSelector } from 'hooks/redux';

import { favoritesAPI } from 'services/favoritesService';

import MovieCard from 'components/MovieCard';
import Preloader from 'components/Preloader';

import TrashSvg from 'assets/icons/trash.svg';
import Button from 'elements/Button';

const Favorites = () => {
	const isAuth = useAppSelector((state) => state.auth.isAuth);
	const [getFavoritesMovies, { data, isLoading }] =
		favoritesAPI.useLazyGetFavoritesMoviesQuery();
	const [removeMovieFromFavorites] = favoritesAPI.useRemoveMovieMutation();
	const [removeAllFavorites, { isLoading: loadingRemoveAll }] =
		favoritesAPI.useRemoveAllFavoritesMutation();

	useEffect(() => {
		if (isAuth) {
			getFavoritesMovies();
		}
	}, [isAuth]);

	const onRemoveMovieFromFavorites = (key: string) => {
		if (
			window.confirm('Вы уверены, что хотите удалить этот фильм из избранного?')
		) {
			removeMovieFromFavorites({ movieKey: key })
				.then(() => toast.success('Вы успешно удалили фильм из избранного!'))
				.catch(() => toast.error('Что-то пошло не так!'));
		}
	};

	const onRemoveAllFavorites = () => {
		if (window.confirm('Вы уверены, что хотите удалить все в избранном?')) {
			removeAllFavorites()
				.then(() => toast.success('Вы успешно удалили все в избранном!'))
				.catch(() => toast.error('Что-то пошло не так!'));
		}
	};

	if (isLoading) {
		return <Preloader />;
	}

	return !data ? null : (
		<main className="mx-auto bg-white w-[1200px] p-10 my-28 rounded-2xl">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Избранное: </h2>
				{data.length === 0 ? (
					''
				) : (
					<div className="flex justify-end mb-5">
						<Button onClick={onRemoveAllFavorites} disabled={loadingRemoveAll}>
							Очистить избранное
						</Button>
					</div>
				)}
			</div>

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
