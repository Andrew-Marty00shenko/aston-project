import { Link } from 'react-router-dom';

import type { Movie } from 'types/movies';

interface Props {
	movies: Movie[] | undefined;
}

const SuggestsMovies = ({ movies }: Props) => {
	return (
		<div className="bg-white mt-5 rounded-2xl shadow-2xl w-full overflow-hidden absolute">
			{movies?.slice(0, 5).map((item) => {
				return (
					<Link key={item.id} to={`movie/${item.id}`}>
						<li className=" flex items-center font-semibold text-lg px-5 py-2 hover:bg-gray">
							<img
								className="mr-3 w-12 rounded-md"
								src={item.previewUrl}
								alt="poster"
							/>
							{item.name}
						</li>
					</Link>
				);
			})}
		</div>
	);
};

export default SuggestsMovies;
