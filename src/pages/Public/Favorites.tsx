import { favoritesAPI } from 'services/favoritesService';

import MovieCard from 'components/MovieCard';
import Preloader from 'components/Preloader';

const Favorites = () => {
	const { uid, token } = JSON.parse(localStorage.getItem('user') as string);
	const { data, isLoading } = favoritesAPI.useGetFavoritesMoviesQuery({
		uid,
		token,
	});

	if (isLoading || !data) {
		return <Preloader />;
	}

	return (
		<main className="mx-auto bg-white w-[1200px] p-10 my-28 rounded-2xl">
			<h2 className="text-2xl font-bold">Избранное: </h2>

			<div className="mt-10 flex justify-between flex-wrap">
				{data.map((item) => (
					<MovieCard key={item.id} movie={item} />
				))}
			</div>
		</main>
	);
};

export default Favorites;
