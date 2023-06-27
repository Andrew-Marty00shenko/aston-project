import { FC } from 'react';
import { Link } from 'react-router-dom';

import Button from 'elements/Button';

import LogoSvg from 'assets/images/logo.svg';

const Header: FC = () => {
	return (
		<header className="flex items-center justify-between bg-black h-20 px-20">
			<Link to="/">
				<img className="cursor-pointer" src={LogoSvg} alt="logo" />
			</Link>

			<div className="flex items-center justify-between w-[300px]">
				<Button>Войти</Button>
				<Button>Зарегистрироваться</Button>
			</div>
		</header>
	);
};

export default Header;
