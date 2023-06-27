import { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Main = lazy(() => import('pages/Public/Main'));
const Login = lazy(() => import('pages/Public/Login'));
const Registration = lazy(() => import('pages/Public/Registration'));

const Public: FC = () => {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/login" element={<Login />} />
				<Route path="/registration" element={<Registration />} />
			</Routes>
		</Suspense>
	);
};

export default Public;
