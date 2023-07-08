import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from '@firebase/auth';
import { toast } from 'react-hot-toast';

import { setIsAuth } from 'redux/slices/authSlice';

import { auth } from 'firebase.config';

import type { LoginForm } from 'pages/Public/Login/Login';
import type { RegistrationForm } from 'pages/Public/Registration/Registration';

export const loginAction = createAsyncThunk(
	'auth/login',
	async (args: LoginForm, { rejectWithValue }) => {
		try {
			const response = await signInWithEmailAndPassword(
				auth,
				args.email,
				args.password
			);
			const token = await response.user.getIdToken();
			const uid = response.user.uid;

			return { token, uid };
		} catch (err) {
			toast.error('Неверный логин или пароль!');
			return rejectWithValue(err);
		}
	}
);

export const registrationAction = createAsyncThunk(
	'auth/registration',
	async ({ email, password }: RegistrationForm, { rejectWithValue }) => {
		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const token = await response.user.getIdToken();
			const uid = response.user.uid;

			if (response.user) {
				toast.success('Вы успешно зарегистрировались на нашем сайте!');
			}

			return { token, uid };
		} catch (err) {
			toast.error('Такой пользователь уже сущетсвует!');
			return rejectWithValue(err);
		}
	}
);

export const logoutAction = createAsyncThunk(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			const response = await signOut(auth);

			return response;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const authCheckAction = createAsyncThunk(
	'auth/checkAuth',
	(_, { rejectWithValue, dispatch }) => {
		try {
			onAuthStateChanged(auth, async (user) => {
				if (user) {
					const token = await user.getIdToken();
					const uid = user.uid;

					dispatch(setIsAuth({ isAuth: true, token, uid }));
				}
			});
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
