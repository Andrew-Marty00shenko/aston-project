import { FC } from 'react';
import { Link } from 'react-router-dom';

import Button from 'elements/Button';

import LogoSvg from 'assets/images/logo.svg';

const Header: FC = () => {
	return (
		<header className="flex items-center justify-between bg-black h-20 px-20 fixed top-0 w-full z-50">
			<Link to="/">
				<img className="cursor-pointer" src={LogoSvg} alt="logo" />
			</Link>

			<div className="flex items-center justify-between w-[300px]">
				<Link to="/login">
					<Button>Войти</Button>
				</Link>
				<Link to="/registration">
					<Button>Зарегистрироваться</Button>
				</Link>
			</div>
		</header>
	);
};

export default Header;
