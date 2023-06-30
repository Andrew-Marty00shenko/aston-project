import classnames from 'classnames';

interface Props {
	children: string;
	className?: 'w-full' | 'wish';
	disabled?: boolean;
	icon?: string;
}
const Button = ({ children, className, disabled, icon }: Props) => {
	return (
		<button
			className={classnames(
				'px-5 h-[50px] bg-orange rounded-xl text-white hover:opacity-70 flex justify-center items-center',
				{
					'w-full': className === 'w-full',
					'!bg-gray !text-black-opacity font-bold rounded-3xl':
						className === 'wish',
					'disabled:bg-black': disabled,
				}
			)}
			disabled={disabled}
		>
			{icon && <img src={icon} className="w-6 h-6 mr-2" alt="button" />}
			{children}
		</button>
	);
};

export default Button;
