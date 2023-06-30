import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { moviesAPI } from 'services/moviesService';

import Preloader from 'components/Preloader';

import Button from 'elements/Button';

import StarSvg from 'assets/icons/star.svg';

const Movie = () => {
	const { id: movieId } = useParams();
	const { data, isLoading } = moviesAPI.useFetchMovieByIdQuery({
		movieId: Number(movieId),
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (isLoading) {
		return <Preloader />;
	}

	return (
		<main className="mx-auto bg-white w-[1200px] p-10 my-28 rounded-2xl">
			<div className="flex">
				<div className="w-[320px] h-max shadow-2xl p-5 rounded-2xl">
					<img src={data?.url} className="w-full" alt="poster" />

					{data?.watchability.length !== 0 && (
						<div className="mt-5">
							<span className="font-bold text-xl">Где посмотреть</span>
							<ul className="flex flex-col items-start">
								{data?.watchability.map((item) => {
									return (
										<li key={item.name} className="mt-4">
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
							{data?.name} ({data?.year})
						</h2>

						<Button className="wish" icon={StarSvg}>
							Буду смотреть
						</Button>
					</div>

					<p className="text-2xl text-black-opacity mt-5">
						{data?.alternativeName} ({data?.ageRating}+)
					</p>

					<p className="mt-5 max-w-[700px]">{data?.description}</p>

					<h5 className="font-bold mt-5 text-3xl">О фильме</h5>

					<ul className="w-full mt-5">
						<li className="flex justify-between mt-4">
							<span> Год производства </span>
							<span>{data?.year}</span>
						</li>

						<li className="flex justify-between  mt-4">
							<span> Страны </span>
							<ul className="flex">
								{data?.countries.map((country) => (
									<li className="ml-2" key={country.name}>
										{country.name}
									</li>
								))}
							</ul>
						</li>

						<li className="flex justify-between  mt-4">
							<span> Жанры </span>
							<ul className="flex">
								{data?.genres.map((genre) => (
									<li className="ml-2" key={genre.name}>
										{genre.name}
									</li>
								))}
							</ul>
						</li>

						<li className="flex justify-between  mt-4">
							<span> Рейтинги </span>
							<ul className="flex">
								<li>KP: {data?.rating.kp}</li>
								<li className="ml-2">IMDb: {data?.rating.imdb}</li>
							</ul>
						</li>

						<li className="flex justify-between mt-4">
							<span>Возраст</span>
							<span>{data?.ageRating}+</span>
						</li>

						{Object.keys(data?.feesRussia || {}).length !== 0 && (
							<li className="flex justify-between mt-4">
								<span>Сборы в России</span>
								<span>
									{data?.feesRussia.value.toLocaleString()}
									{data?.feesRussia.currency}
								</span>
							</li>
						)}

						{Object.keys(data?.feesRussia || {}).length !== 0 && (
							<li className="flex justify-between mt-4">
								<span>Сборы в мире</span>
								<span>
									<span>
										{data?.feesWorld.value.toLocaleString()}
										{data?.feesWorld.currency}
									</span>
								</span>
							</li>
						)}
					</ul>
				</div>
			</div>
		</main>
	);
};

export default Movie;
