import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';

import { loginValidation } from './loginValidation';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { loginAction } from 'redux/actions/authActions';

import InputField from 'elements/InputField';
import Button from 'elements/Button';

import EmailSvg from 'assets/icons/email.svg';
import LockSvg from 'assets/icons/lock.svg';

export interface LoginForm {
	email: string;
	password: string;
}

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const loading = useAppSelector((state) => state.auth.loading);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({
		resolver: yupResolver(loginValidation),
	});

	const loginUser = async (data: LoginForm) => {
		try {
			const user = await dispatch(loginAction(data));

			if (user.type !== 'auth/login/rejected') {
				navigate('/');
			}
		} catch (err) {
			const typedError = err as Error;
			toast.error(typedError.message);
		}
	};

	return (
		<form
			className="w-[400px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded-2xl"
			onSubmit={handleSubmit(loginUser)}
		>
			<h2 className="text-center text-lg">Войдите в аккаунт</h2>

			<div className="mt-5">
				<InputField
					name="email"
					type="email"
					label="Email"
					icon={EmailSvg}
					register={register}
					error={errors.email}
				/>
			</div>

			<div className="mt-5">
				<InputField
					name="password"
					type="password"
					label="Пароль"
					icon={LockSvg}
					register={register}
					error={errors.password}
				/>
			</div>

			<p className="mt-5">
				Нет аккаунта?{' '}
				<Link className=" font-bold border-b border-black" to="/registration">
					Создайте его
				</Link>
			</p>

			<div className="mt-5">
				<Button disabled={loading} className="w-full">
					{loading ? 'загрузка...' : 'Войти'}
				</Button>
			</div>
		</form>
	);
};

export default Login;
