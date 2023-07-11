import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { authCheckAction } from 'redux/actions/authActions';

import { useAppDispatch } from 'hooks/redux';

import Routes from 'routes/Routes';

import FeatureFlagProvider from 'context/featureFlag';

import ErrorBoundary from 'components/ErrorBoundary';
import Header from 'components/Header';

const App = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(authCheckAction());
	}, []);

	return (
		<FeatureFlagProvider>
			<ErrorBoundary>
				<Header />
				<Routes />
				<Toaster
					toastOptions={{
						success: {
							iconTheme: {
								primary: '#e84e0e',
								secondary: '#fff',
							},
						},
					}}
				/>
			</ErrorBoundary>
		</FeatureFlagProvider>
	);
};

export default App;
