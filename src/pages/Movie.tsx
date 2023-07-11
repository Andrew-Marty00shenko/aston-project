import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { moviesAPI } from 'services/moviesService';

import Preloader from 'components/Preloader';
import MovieWatchability from 'components/MovieWatchabilityItem';
import MovieInfo from 'components/MovieInfo';

const Movie = () => {
	const { id: movieId } = useParams();
	const {
		data: movie,
		isLoading,
		isError,
	} = moviesAPI.useFetchMovieByIdQuery({
		movieId: Number(movieId),
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (isError) {
		return (
			<p className="mt-28 text-center font-bold text-3xl">
				Что-то пошло не так!
			</p>
		);
	}

	if (isLoading || !movie) {
		return <Preloader />;
	}

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
										<MovieWatchability
											key={index}
											url={item.url}
											name={item.name}
											linkIcon={item.linkIcon}
										/>
									);
								})}
							</ul>
						</div>
					)}
				</div>

				<MovieInfo movie={movie} />
			</div>
		</main>
	);
};

export default Movie;
