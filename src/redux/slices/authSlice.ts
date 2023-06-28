import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

import { loginAction, registrationAction } from 'redux/actions/authActions';

interface AuthSlice {
	isAuth: boolean;
	loading: boolean;
}
const initialState: AuthSlice = {
	isAuth: false,
	loading: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsAuth: (state, action) => {
			state.isAuth = action.payload;
		},
		logoutUser: (state) => {
			state.isAuth = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loginAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(loginAction.fulfilled, (state, action) => {
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
		builder.addCase(registrationAction.fulfilled, (state) => {
			toast.success('Вы успешно зарегистрировались на нашем сайте!');
			state.isAuth = true;
			state.loading = false;
		});
		builder.addCase(registrationAction.rejected, (state) => {
			toast.error('Такой пользователь уже сущетсвует!');
			state.loading = false;
		});
	},
});
export const { setIsAuth, logoutUser } = authSlice.actions;
export default authSlice.reducer;
