import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from '@firebase/auth';
import { toast } from 'react-hot-toast';

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

			if (response.user) {
				localStorage.setItem('user', JSON.stringify({ token, uid }));
			}

			return response;
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
				localStorage.setItem('user', JSON.stringify({ token, uid }));
				toast.success('Вы успешно зарегистрировались на нашем сайте!');
			}

			return response;
		} catch (err) {
			toast.error('Такой пользователь уже сущетсвует!');
			return rejectWithValue(err);
		}
	}
);
