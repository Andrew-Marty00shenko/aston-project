import { FC } from 'react';
import classnames from 'classnames';

interface Props {
	name: string;
	className?: string;
}

const Button: FC<Props> = ({ name }) => {
	return (
		<button
			className={classnames(
				'px-5 h-[50px] bg-orange rounded-xl text-white hover:opacity-70'
			)}
		>
			{name}
		</button>
	);
};

export default Button;
