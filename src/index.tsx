import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import { setupStore } from 'redux/store';

import './index.scss';

const store = setupStore();

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);
