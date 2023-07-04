import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';

import { moviesAPI } from 'services/moviesService';
import { favoritesAPI } from 'services/favoritesService';

const rootReducers = combineReducers({
	auth: authSlice,
	[moviesAPI.reducerPath]: moviesAPI.reducer,
	[favoritesAPI.reducerPath]: favoritesAPI.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducers,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({ serializableCheck: false })
				.concat(moviesAPI.middleware)
				.concat(favoritesAPI.middleware),
	});
};

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
