import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { useAppDispatch } from 'hooks/redux';

import { setIsAuth } from 'redux/slices/authSlice';

import Routes from 'routes/Routes';

import FeatureFlagProvider from 'context/featureFlag';

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
		<FeatureFlagProvider>
			<ErrorBoundary>
				<Header />
				<Routes />
				<Toaster />
			</ErrorBoundary>
		</FeatureFlagProvider>
	);
};

export default App;
