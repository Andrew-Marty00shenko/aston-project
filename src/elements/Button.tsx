import classnames from 'classnames';

interface Props {
	children: string;
	className?: string;
	disabled?: boolean;
}

const Button = ({ children, className, disabled }: Props) => {
	return (
		<button
			className={classnames(
				'px-5 h-[50px] bg-orange rounded-xl text-white hover:opacity-70',
				{
					'w-full': className === 'w-full',
					'disabled:bg-black': disabled,
				}
			)}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
