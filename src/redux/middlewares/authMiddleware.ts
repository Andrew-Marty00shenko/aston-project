import { Dispatch, Middleware, MiddlewareAPI, Action } from '@reduxjs/toolkit';

interface EffectAction extends Action {
	effect<T>(action: T): void;
}

export const authMiddleware: Middleware =
	(store: MiddlewareAPI<any>) =>
	(next: Dispatch<EffectAction>) =>
	(action: EffectAction) => {
		const date = new Date().toString();

		if (action.type === 'auth/setIsAuth') {
			console.groupCollapsed('Вход в приложение:');
			console.log('1.', date);
			console.log('2. Выполнен ли вход:', store.getState().auth.isAuth);
			console.log('3. auth state', store.getState().auth);
			console.groupEnd();
		}

		if (action.type === 'auth/logoutUser') {
			console.groupCollapsed('Выход из приложения:');
			console.log('1.', date);
			console.log('2. Вышел из аккаунта:', store.getState().auth.isAuth);
			console.log('3. auth state', store.getState().auth);
			console.groupEnd();
		}

		return next(action);
	};
