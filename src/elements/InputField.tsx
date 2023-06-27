import { FC } from 'react';

interface Props {
	icon?: string;
	label: string;
	type: string;
}

const InputField: FC<Props> = ({ label, icon, type }) => {
	return (
		<div className="w-full relative">
			<label htmlFor={label}>{label}</label>
			<input
				id={label}
				className="bg-gray w-full h-14 mt-1 rounded-2xl px-12"
				placeholder={label}
				type={type}
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
