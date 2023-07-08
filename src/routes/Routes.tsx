import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

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
const NotFound = lazy(() => import('pages/Public/NotFound'));

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
				<Route path="/not-found" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/not-found" />} />
			</Routes>
		</Suspense>
	);
};
export default Public;
