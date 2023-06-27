import { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Main = lazy(() => import('pages/Main'));

const Public: FC = () => {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<Routes>
				<Route path="/" element={<Main />} />
			</Routes>
		</Suspense>
	);
};

export default Public;
