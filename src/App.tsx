import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { useAppDispatch } from 'hooks/redux';

import { setIsAuth } from 'redux/slices/authSlice';

import Routes from 'routes/Routes';

import ErrorBoundary from 'components/ErrorBoundary';
import Header from 'components/Header';

const App = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (localStorage.getItem('user') !== null) {
			dispatch(setIsAuth(true));
		}
	}, []);

	return (
		<ErrorBoundary>
			<Header />
			<Routes />
			<Toaster />
		</ErrorBoundary>
	);
};

export default App;
