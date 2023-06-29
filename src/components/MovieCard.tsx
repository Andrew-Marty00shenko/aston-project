import { Link } from 'react-router-dom';

import Button from 'elements/Button';

import type { Movie } from 'types/movies';

interface Props {
	movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
	return (
		<Link to={`/movie/${movie.id}`}>
			<div className="flex flex-col mb-5 justify-between w-[350px] h-[600px] shadow-2xl rounded-2xl p-5">
				<div className="h-1/2 rounded-2xl flex justify-center">
					<img
						className="h-full bg-gray rounded-2xl"
						src={movie.previewUrl}
						alt="preview"
					/>
				</div>

				<div className="mt-2">
					<h4 className="font-bold text-xl">
						{movie.name} ({movie.year})
					</h4>
					<p className="mt-2 text-sm">
						<span className="font-bold">Описание:</span>{' '}
						{movie.shortDescription}
					</p>
				</div>

				<div className="mt-2">
					<p className="text-sm">
						<span className="font-bold">Оценка:</span> KP:
						<span className="font-bold"> {movie.rating.kp}</span> imdb:{' '}
						<span className="font-bold"> {movie.rating.imdb}</span>
					</p>
				</div>

				<div className="mt-2">
					<p className="text-sm font-bold">
						Жанры:{' '}
						{movie.genres.map((genre) => (
							<span className=" font-normal" key={genre.name}>
								{genre.name}{' '}
							</span>
						))}
					</p>
				</div>

				<div className="mt-2">
					<Button className="w-full">Подробнее</Button>
				</div>
			</div>
		</Link>
	);
};

export default MovieCard;
