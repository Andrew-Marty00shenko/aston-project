import { FC } from 'react';
import { Toaster } from 'react-hot-toast';

import Routes from 'routes/Routes';

import ErrorBoundary from 'components/ErrorBoundary';
import Header from 'components/Header';

const App: FC = () => {
	return (
		<ErrorBoundary>
			<Header />
			<Routes />
			<Toaster />
		</ErrorBoundary>
	);
};

export default App;
