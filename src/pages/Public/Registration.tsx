import { FC } from 'react';
import { Link } from 'react-router-dom';

import InputField from 'elements/InputField';
import Button from 'elements/Button';

import EmailSvg from 'assets/icons/email.svg';
import LockSvg from 'assets/icons/lock.svg';

const Registration: FC = () => {
	return (
		<form className="w-[400px] mx-auto mt-28 p-8 bg-white rounded-2xl">
			<h2 className="text-center text-lg">Создайте аккаунт</h2>

			<div className="mt-5">
				<InputField type="email" label="Email" icon={EmailSvg} />
			</div>

			<div className="mt-5">
				<InputField type="password" label="Пароль" icon={LockSvg} />
			</div>

			<div className="mt-5">
				<InputField type="password" label="Повторите пароль" icon={LockSvg} />
			</div>

			<p className="mt-5">
				Уже есть аккаунт?{' '}
				<Link className=" font-bold border-b border-black" to="/login">
					Войдите
				</Link>
			</p>

			<div className="mt-5">
				<Button className="w-full">Зарегистрироваться</Button>
			</div>
		</form>
	);
};

export default Registration;
