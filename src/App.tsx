import { Toaster } from 'react-hot-toast';

import Routes from 'routes/Routes';

import ErrorBoundary from 'components/ErrorBoundary';
import Header from 'components/Header';

const App = () => {
	return (
		<ErrorBoundary>
			<Header />
			<Routes />
			<Toaster />
		</ErrorBoundary>
	);
};

export default App;
