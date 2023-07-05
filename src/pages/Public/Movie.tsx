import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { TelegramShareButton } from 'react-share';

import { moviesAPI } from 'services/moviesService';
import { favoritesAPI } from 'services/favoritesService';

import { useAppSelector } from 'hooks/redux';

import { FeatureFlagContext } from 'context/featureFlag.context';

import Preloader from 'components/Preloader';

import Button from 'elements/Button';

import StarSvg from 'assets/icons/star.svg';
import CheckSvg from 'assets/icons/check.svg';
import TelegramSvg from 'assets/icons/telegram.svg';

const Movie = () => {
	const navigate = useNavigate();
	const { id: movieId } = useParams();
	const { isFeatureFlag } = useContext(FeatureFlagContext);
	const { isAuth } = useAppSelector((state) => state.auth);
	const { data: movie, isLoading } = moviesAPI.useFetchMovieByIdQuery({
		movieId: Number(movieId),
	});
	const { data: favoritesMovies } = favoritesAPI.useGetFavoritesMoviesQuery();
	const [addMovieToFavorites] = favoritesAPI.useAddMovieMutation();

	const existsInFavorites = favoritesMovies?.find(
		(item) => item.id === movie?.id
	);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (isLoading || !movie) {
		return <Preloader />;
	}

	const onAddMovieToFavorites = () => {
		if (isAuth) {
			addMovieToFavorites({ movie });
		} else {
			navigate('/login');
			toast.error('Для добавления фильма в избранное нужно войти в аккаунт!');
		}
	};

	return (
		<main className="mx-auto bg-white w-[1200px] p-10 my-28 rounded-2xl">
			<div className="flex">
				<div className="w-[320px] h-max shadow-2xl p-5 rounded-2xl">
					<img src={movie.poster.url} className="w-full" alt="poster" />

					{movie.watchability.items.length !== 0 && (
						<div className="mt-5">
							<span className="font-bold text-xl">Где посмотреть</span>
							<ul className="flex flex-col items-start">
								{movie.watchability.items.map((item, index) => {
									return (
										<li key={index} className="mt-4">
											<a
												className="flex justify-center items-center hover:text-red"
												href={item.url}
												target="_blank"
												rel="noreferrer"
											>
												<img
													className="w-10 h-10 rounded-lg mr-2"
													src={item.linkIcon}
													alt="link"
												/>
												{item.name}
											</a>
										</li>
									);
								})}
							</ul>
						</div>
					)}
				</div>

				<div className="ml-10 w-full">
					<div className="flex justify-between">
						<h2 className=" text-5xl font-bold">
							{movie.name} ({movie.year})
						</h2>

						{existsInFavorites ? (
							<div className="flex items-center border border-orange px-4 rounded-xl">
								<p className="font-bold text-lg text-orange">Уже в избранном</p>
								<img className="w-6 h-6" src={CheckSvg} alt="check" />
							</div>
						) : (
							<Button
								onClick={onAddMovieToFavorites}
								className="wish"
								icon={StarSvg}
							>
								Буду смотреть
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

					{isFeatureFlag && (
						<div className="flex justify-end">
							<TelegramShareButton
								className="flex items-center !bg-gray !px-4 !py-2 mt-5 rounded-xl"
								url={
									movie.watchability.items.length !== 0
										? `${movie.watchability.items[0].url}`
										: `${window.origin}/movie/${movie.id}`
								}
							>
								Поделиться в telegram
								<img
									className="w-8 h-8 ml-2"
									src={TelegramSvg}
									alt="telegram"
								/>
							</TelegramShareButton>
						</div>
					)}
				</div>
			</div>
		</main>
	);
};

export default Movie;
