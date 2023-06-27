import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from '@firebase/auth';

import { auth } from 'firebase.config';

import type { LoginForm } from 'pages/Public/Login';
import type { RegistrationForm } from 'pages/Public/Registration';

export const loginAction = createAsyncThunk(
	'auth/login',
	async (args: LoginForm, { rejectWithValue }) => {
		try {
			const response = await signInWithEmailAndPassword(
				auth,
				args.email,
				args.password
			);

			return response;
		} catch (err) {
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

			return response;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
