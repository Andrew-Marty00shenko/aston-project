import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { useAppSelector } from 'hooks/redux';

import { useFeatureFlag } from 'context/featureFlag';

import { favoritesAPI } from 'services/favoritesService';

import ShareTelegram from 'components/ShareTelegram';

import Button from 'elements/Button';

import StarSvg from 'assets/icons/star.svg';
import CheckSvg from 'assets/icons/check.svg';

import type { MovieById } from 'types/movies';

interface Props {
	movie: MovieById;
}

const MovieInfo = ({ movie }: Props) => {
	const navigate = useNavigate();
	const { isTelegramShareEnabled } = useFeatureFlag();
	const { isAuth } = useAppSelector((state) => state.auth);
	const [addMovieToFavorites, { isLoading }] =
		favoritesAPI.useAddMovieMutation();
	const { data: favoritesMovies } = favoritesAPI.useGetFavoritesMoviesQuery();

	const existsInFavorites = favoritesMovies?.find(
		(item) => item.id === movie?.id
	);

	const onAddMovieToFavorites = () => {
		if (isAuth) {
			addMovieToFavorites({ movie });
		} else {
			navigate('/login');
			toast.error('Для добавления фильма в избранное нужно войти в аккаунт!');
		}
	};

	return (
		<div className="ml-10 w-full">
			<div className="flex justify-between">
				<h2 className=" text-5xl font-bold">
					{movie.name} ({movie.year})
				</h2>

				{existsInFavorites ? (
					<div className="flex items-center border justify-center border-orange w-44 rounded-xl">
						<p className="font-bold text-lg text-orange">В избранном</p>
						<img className="w-6 h-6" src={CheckSvg} alt="check" />
					</div>
				) : (
					<Button
						disabled={isLoading}
						onClick={onAddMovieToFavorites}
						className="wish"
						icon={StarSvg}
					>
						В избранное
					</Button>
				)}
			</div>

			<p className="text-2xl text-black-opacity mt-5">
				{movie.alternativeName} ({movie.ageRating}+)
			</p>

			<p className="mt-5 max-w-[700px]">{movie.description}</p>

			<h5 className="font-bold mt-5 text-3xl">О фильме</h5>

			<ul className="w-full mt-5 border-b pb-5">
				<li className="flex justify-between mt-4">
					<span> Год производства </span>
					<span>{movie.year}</span>
				</li>

				<li className="flex justify-between  mt-4">
					<span> Страны </span>
					<ul className="flex">
						{movie.countries.map((country) => (
							<li className="ml-2" key={country.name}>
								{country.name}
							</li>
						))}
					</ul>
				</li>

				<li className="flex justify-between  mt-4">
					<span> Жанры </span>
					<ul className="flex">
						{movie.genres.map((genre) => (
							<li className="ml-2" key={genre.name}>
								{genre.name}
							</li>
						))}
					</ul>
				</li>

				<li className="flex justify-between  mt-4">
					<span> Рейтинги </span>
					<ul className="flex">
						<li>KP: {movie.rating.kp}</li>
						<li className="ml-2">IMDb: {movie.rating.imdb}</li>
					</ul>
				</li>

				<li className="flex justify-between mt-4">
					<span>Возраст</span>
					<span>{movie.ageRating}+</span>
				</li>

				{Object.keys(movie.feesRussia || {}).length !== 0 && (
					<li className="flex justify-between mt-4">
						<span>Сборы в России</span>
						<span>
							{movie.feesRussia.value.toLocaleString()}
							{movie.feesRussia.currency}
						</span>
					</li>
				)}

				{Object.keys(movie.feesRussia || {}).length !== 0 && (
					<li className="flex justify-between mt-4">
						<span>Сборы в мире</span>
						<span>
							<span>
								{movie.feesWorld.value.toLocaleString()}
								{movie.feesWorld.currency}
							</span>
						</span>
					</li>
				)}
			</ul>

			{isTelegramShareEnabled && <ShareTelegram movie={movie} />}
		</div>
	);
};

export default MovieInfo;
