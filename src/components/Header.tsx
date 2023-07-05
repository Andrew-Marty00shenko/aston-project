import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks/redux';

import { logoutUser } from 'redux/slices/authSlice';

import { historyAPI } from 'services/historyService';
import { favoritesAPI } from 'services/favoritesService';

import Button from 'elements/Button';
import LogoSvg from 'assets/images/logo.svg';

const Header = () => {
	const { isAuth } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const clickLogout = () => {
		localStorage.removeItem('user');
		dispatch(historyAPI.util.resetApiState());
		dispatch(favoritesAPI.util.resetApiState());
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
					<Link to="/history">
						<span className="text-white mr-10 text-xl">История</span>
					</Link>
					<Link to="/favorites">
						<span className="text-white mr-10 text-xl">Избранное</span>
					</Link>
					<Link to="/" onClick={clickLogout}>
						<Button>Выйти</Button>
					</Link>
				</div>
			)}
		</header>
	);
};

export default Header;
