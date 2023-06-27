import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks/redux';

import { logoutUser } from 'redux/slices/authSlice';

import Button from 'elements/Button';

import LogoSvg from 'assets/images/logo.svg';

const Header = () => {
	const { isAuth } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const clickLogout = () => {
		dispatch(logoutUser());
	};

	return (
		<header className="flex items-center justify-between bg-black h-20 px-20 fixed top-0 w-full z-50">
			<Link to="/">
				<img className="cursor-pointer" src={LogoSvg} alt="logo" />
			</Link>

			{!isAuth ? (
				<div className="flex items-center justify-between w-[300px]">
					<Link to="/login">
						<Button>Войти</Button>
					</Link>
					<Link to="/registration">
						<Button>Зарегистрироваться</Button>
					</Link>
				</div>
			) : (
				<div className="flex items-center justify-between">
					<Link to="/" onClick={clickLogout}>
						<Button>Выйти</Button>
					</Link>
				</div>
			)}
		</header>
	);
};

export default Header;
