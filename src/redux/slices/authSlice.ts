import { createSlice } from '@reduxjs/toolkit';

import {
	loginAction,
	logoutAction,
	registrationAction,
} from 'redux/actions/authActions';

interface AuthSlice {
	isAuth: boolean;
	loading: boolean;
	token: string;
	uid: string;
}
const initialState: AuthSlice = {
	isAuth: false,
	loading: false,
	token: '',
	uid: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsAuth: (state, action) => {
			state.isAuth = action.payload.isAuth;
			state.token = action.payload.token;
			state.uid = action.payload.uid;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loginAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(loginAction.fulfilled, (state, action) => {
			state.isAuth = true;
			state.token = action.payload.token;
			state.uid = action.payload.uid;
			state.loading = false;
		});
		builder.addCase(loginAction.rejected, (state) => {
			state.loading = false;
		});
		builder.addCase(registrationAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(registrationAction.fulfilled, (state, action) => {
			state.isAuth = true;
			state.token = action.payload.token;
			state.uid = action.payload.uid;
			state.loading = false;
		});
		builder.addCase(registrationAction.rejected, (state) => {
			state.loading = false;
		});
		builder.addCase(logoutAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(logoutAction.fulfilled, (state) => {
			state.isAuth = false;
			state.token = '';
			state.uid = '';
			state.loading = false;
		});
		builder.addCase(logoutAction.rejected, (state) => {
			state.loading = false;
		});
	},
});
export const { setIsAuth } = authSlice.actions;
export default authSlice.reducer;
