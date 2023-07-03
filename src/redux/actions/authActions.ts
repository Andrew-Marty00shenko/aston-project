import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from '@firebase/auth';

import { auth } from 'firebase.config';

import type { LoginForm } from 'pages/Public/Login/Login';
import type { RegistrationForm } from 'pages/Public/Registration/Registration';
import { toast } from 'react-hot-toast';

export const loginAction = createAsyncThunk(
	'auth/login',
	async (args: LoginForm, { rejectWithValue }) => {
		try {
			const response = await signInWithEmailAndPassword(
				auth,
				args.email,
				args.password
			);

			if (response.user) {
				localStorage.setItem(
					'user',
					JSON.stringify(response.user.providerData)
				);
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

			if (response.user) {
				localStorage.setItem(
					'user',
					JSON.stringify(response.user.providerData)
				);

				toast.success('Вы успешно зарегистрировались на нашем сайте!');
			}

			return response;
		} catch (err) {
			toast.error('Такой пользователь уже сущетсвует!');
			return rejectWithValue(err);
		}
	}
);
