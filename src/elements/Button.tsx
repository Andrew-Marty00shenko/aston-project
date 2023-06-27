import { FC } from 'react';
import classnames from 'classnames';

interface Props {
	children: string;
	className?: string;
}

const Button: FC<Props> = ({ children, className }) => {
	return (
		<button
			className={classnames(
				'px-5 h-[50px] bg-orange rounded-xl text-white hover:opacity-70',
				{
					'w-full': className === 'w-full',
				}
			)}
		>
			{children}
		</button>
	);
};

export default Button;
