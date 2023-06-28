import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

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

const loginValidation = Yup.object().shape({
	email: Yup.string()
		.required('*поле обязательно для заполнения')
		.email('*поле обязательно для заполнения'),
	password: Yup.string().required('*поле обязательно для заполнения'),
});

const Login = () => {
	const dispatch = useAppDispatch();
	const { loading } = useAppSelector((state) => state.auth);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({
		resolver: yupResolver(loginValidation),
	});

	const loginUser = async (data: LoginForm) => {
		await dispatch(loginAction(data));
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
