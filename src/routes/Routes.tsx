import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Preloader from 'components/Preloader';

const Main = lazy(() => import('pages/Public/Main'));
const Login = lazy(() => import('pages/Public/Login/Login'));
const Registration = lazy(
	() => import('pages/Public/Registration/Registration')
);
const Movie = lazy(() => import('pages/Public/Movie'));
const Search = lazy(() => import('pages/Public/Search'));
const Favorites = lazy(() => import('pages/Public/Favorites'));
const History = lazy(() => import('pages/Public/History'));

const Public = () => {
	return (
		<Suspense fallback={<Preloader />}>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/login" element={<Login />} />
				<Route path="/registration" element={<Registration />} />
				<Route path="/movie/:id" element={<Movie />} />
				<Route path="/search" element={<Search />} />
				<Route path="/favorites" element={<Favorites />} />
				<Route path="/history" element={<History />} />
			</Routes>
		</Suspense>
	);
};
export default Public;
