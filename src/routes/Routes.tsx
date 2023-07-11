import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Preloader from 'components/Preloader';

const Main = lazy(() => import('pages/Main'));
const Login = lazy(() => import('pages/Login/Login'));
const Registration = lazy(() => import('pages/Registration/Registration'));
const Movie = lazy(() => import('pages/Movie'));
const Search = lazy(() => import('pages/Search'));
const Favorites = lazy(() => import('pages/Favorites'));
const History = lazy(() => import('pages/History'));
const NotFound = lazy(() => import('pages/NotFound'));

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
