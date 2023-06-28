import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';

import { moviesAPI } from 'services/moviesService';

const rootReducers = combineReducers({
	auth: authSlice,
	[moviesAPI.reducerPath]: moviesAPI.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducers,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({ serializableCheck: false }).concat(
				moviesAPI.middleware
			),
	});
};

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
