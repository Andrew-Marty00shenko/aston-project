import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { registrationAction } from 'redux/actions/authActions';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

import InputField from 'elements/InputField';
import Button from 'elements/Button';

import EmailSvg from 'assets/icons/email.svg';
import LockSvg from 'assets/icons/lock.svg';

export interface RegistrationForm {
	email: string;
	password: string;
	confirmPassword: string;
}

const registrationValidation = Yup.object().shape({
	email: Yup.string()
		.required('*поле обязательно для заполнения')
		.email('*поле обязательно для заполнения'),
	password: Yup.string()
		.required('*поле обязательно для заполнения')
		.min(6, '*минимальное кол-во символов 6')
		.max(40, '*минимальное кол-во символов 40'),
	confirmPassword: Yup.string()
		.required('*поле обязательно для заполнения')
		.oneOf([Yup.ref('password')], '*пароли не совпадают'),
});

const Registration = () => {
	const dispatch = useAppDispatch();
	const { loading } = useAppSelector((state) => state.auth);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegistrationForm>({
		resolver: yupResolver(registrationValidation),
	});

	const registrationUser = async (data: RegistrationForm) => {
		await dispatch(registrationAction(data));
	};

	return (
		<form
			className="w-[400px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded-2xl"
			onSubmit={handleSubmit(registrationUser)}
		>
			<h2 className="text-center text-lg">Создайте аккаунт</h2>

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

			<div className="mt-5">
				<InputField
					name="confirmPassword"
					type="password"
					label="Повторите пароль"
					icon={LockSvg}
					register={register}
					error={errors.confirmPassword}
				/>
			</div>

			<p className="mt-5">
				Уже есть аккаунт?{' '}
				<Link className=" font-bold border-b border-black" to="/login">
					Войдите
				</Link>
			</p>

			<div className="mt-5">
				<Button disabled={loading} className="w-full">
					{loading ? 'загрузка...' : 'Зарегистрироваться'}
				</Button>
			</div>
		</form>
	);
};

export default Registration;
