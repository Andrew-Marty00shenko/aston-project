import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

import { loginAction, registrationAction } from 'redux/actions/authActions';

interface AuthSlice {
	isAuth: boolean;
	loading: boolean;
}

const initialState: AuthSlice = {
	isAuth: !!localStorage.getItem('user'),
	loading: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logoutUser: (state) => {
			state.isAuth = false;
			localStorage.removeItem('user');
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loginAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(loginAction.fulfilled, (state, action) => {
			localStorage.setItem(
				'user',
				JSON.stringify(action.payload.user.providerData)
			);
			state.isAuth = true;
			state.loading = false;
		});
		builder.addCase(loginAction.rejected, (state) => {
			state.loading = false;
			toast.error('Неверный логин или пароль!');
		});

		builder.addCase(registrationAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(registrationAction.fulfilled, (state, action) => {
			localStorage.setItem(
				'user',
				JSON.stringify(action.payload.user.providerData)
			);
			toast.error('Вы успешно зарегистрировались на нашем сайте!');
			state.isAuth = true;
			state.loading = false;
		});
		builder.addCase(registrationAction.rejected, (state) => {
			state.loading = false;
			toast.error('Такой пользователь уже сущетсвует!');
		});
	},
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
