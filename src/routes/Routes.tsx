import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { useAppSelector } from 'hooks/redux';

const Main = lazy(() => import('pages/Public/Main'));
const Login = lazy(() => import('pages/Public/Login/Login'));
const Registration = lazy(
	() => import('pages/Public/Registration/Registration')
);
const Movie = lazy(() => import('pages/Public/Movie'));

const Public = () => {
	const navigate = useNavigate();
	const { isAuth } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (isAuth) {
			navigate('/');
		}
	}, [isAuth]);

	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/login" element={<Login />} />
				<Route path="/registration" element={<Registration />} />
				<Route path="/movie/:id" element={<Movie />} />
			</Routes>
		</Suspense>
	);
};
export default Public;
