import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';

const rootReducers = combineReducers({
	auth: authSlice,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducers,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({ serializableCheck: false }),
	});
};

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
