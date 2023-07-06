import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { useAppDispatch } from 'hooks/redux';
import { useReadLocalStorage } from 'hooks/useReadLocalStorage';

import { setIsAuth } from 'redux/slices/authSlice';

import Routes from 'routes/Routes';

import FeatureFlagProvider from 'context/featureFlag';

import ErrorBoundary from 'components/ErrorBoundary';
import Header from 'components/Header';

import type { User } from 'types/user';

const App = () => {
	const dispatch = useAppDispatch();
	const user: User | null = useReadLocalStorage('user');

	useEffect(() => {
		if (user) {
			dispatch(setIsAuth({ isAuth: true, token: user.token, uid: user.uid }));
		}
	}, [user]);

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
