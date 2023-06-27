import { FC } from 'react';

interface Props {
	icon?: string;
	label: string;
}

const InputField: FC<Props> = ({ label, icon }) => {
	return (
		<div className="w-full relative">
			<label htmlFor={label}></label>
			<input
				id={label}
				className="bg-gray w-full h-14 rounded-2xl px-12"
				type="text"
			/>
			{icon && (
				<img
					className="w-6 h-6 absolute left-4 bottom-4"
					src={icon}
					alt={label}
				/>
			)}
		</div>
	);
};

export default InputField;
