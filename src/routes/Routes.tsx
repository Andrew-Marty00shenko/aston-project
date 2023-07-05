import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Main = lazy(() => import('pages/Public/Main'));
const Login = lazy(() => import('pages/Public/Login/Login'));
const Registration = lazy(
	() => import('pages/Public/Registration/Registration')
);
const Movie = lazy(() => import('pages/Public/Movie'));
const Search = lazy(() => import('pages/Public/Search'));
const Favorites = lazy(() => import('pages/Public/Favorites'));

const Public = () => {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/login" element={<Login />} />
				<Route path="/registration" element={<Registration />} />
				<Route path="/movie/:id" element={<Movie />} />
				<Route path="/search" element={<Search />} />
				<Route path="/favorites" element={<Favorites />} />
			</Routes>
		</Suspense>
	);
};
export default Public;
