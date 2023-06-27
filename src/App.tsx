import { FC } from 'react';

import Routes from 'routes/Routes';

import ErrorBoundary from 'components/ErrorBoundary';
import Header from 'components/Header';

const App: FC = () => {
	return (
		<ErrorBoundary>
			<Header />
			<Routes />
		</ErrorBoundary>
	);
};

export default App;
