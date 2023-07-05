import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { useAppDispatch } from 'hooks/redux';

import { FeatureFlagContext } from 'context/featureFlag.context';

import { featureFlagAPI } from 'services/featureFlagService';

import { setIsAuth } from 'redux/slices/authSlice';

import Routes from 'routes/Routes';

import ErrorBoundary from 'components/ErrorBoundary';
import Header from 'components/Header';

const App = () => {
	const [isFeatureFlag, setIsFeatureFlag] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const { data } = featureFlagAPI.useGetStatusFeatureFlagQuery();

	useEffect(() => {
		if (data) {
			setIsFeatureFlag(data.isTelegramShareEnabled);
		}
	}, [data]);

	useEffect(() => {
		if (localStorage.getItem('user') !== null) {
			dispatch(setIsAuth(true));
		}
	}, []);

	return (
		<FeatureFlagContext.Provider value={{ isFeatureFlag, setIsFeatureFlag }}>
			<ErrorBoundary>
				<Header />
				<Routes />
				<Toaster />
			</ErrorBoundary>
		</FeatureFlagContext.Provider>
	);
};

export default App;
