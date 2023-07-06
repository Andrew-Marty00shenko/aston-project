import { Dispatch, Middleware, MiddlewareAPI, Action } from '@reduxjs/toolkit';

interface EffectAction extends Action {
	effect<T>(action: T): void;
}

export const authMiddleware: Middleware =
	(store: MiddlewareAPI) =>
	(next: Dispatch<EffectAction>) =>
	(action: EffectAction) => {
		const date = new Date().toString();

		if (action.type === 'auth/setIsAuth') {
			//eslint-disable-next-line no-console
			console.groupCollapsed('Вход в приложение:');
			//eslint-disable-next-line no-console
			console.log('1.', date);
			//eslint-disable-next-line no-console
			console.log('2. Выполнен ли вход:', store.getState().auth.isAuth);
			//eslint-disable-next-line no-console
			console.log('3. auth state', store.getState().auth);
			//eslint-disable-next-line no-console
			console.groupEnd();
		}

		if (action.type === 'auth/logoutUser') {
			//eslint-disable-next-line no-console
			console.groupCollapsed('Выход из приложения:');
			//eslint-disable-next-line no-console
			console.log('1.', date);
			//eslint-disable-next-line no-console
			console.log('2. Вышел из аккаунта:', store.getState().auth.isAuth);
			//eslint-disable-next-line no-console
			console.log('3. auth state', store.getState().auth);
			//eslint-disable-next-line no-console
			console.groupEnd();
		}

		return next(action);
	};
