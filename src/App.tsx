import { FC } from 'react';

import Routes from 'routes/Routes';

import ErrorBoundary from 'components/ErrorBoundary';
import Header from 'components/Header';

const App: FC = () => {
	return (
		<div className=" bg-white">
			<ErrorBoundary>
				<Header />
				<Routes />
			</ErrorBoundary>
		</div>
	);
};

export default App;
