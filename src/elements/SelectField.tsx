import { FC } from 'react';

import ArrowDownSvg from 'assets/icons/arrow-down.svg';

interface Props {
	label: string;
	value: string;
}

const SelectField: FC<Props> = ({ label, value }) => {
	return (
		<div className="w-full cursor-pointer">
			<label htmlFor="">{label}</label>
			<div className="bg-gray w-full h-14 mt-1 rounded-2xl relative flex items-center px-4">
				<span>{value}</span>
				<img
					className="w-6 h-6 absolute right-2"
					src={ArrowDownSvg}
					alt="arrow"
				/>
			</div>
			<div></div>
		</div>
	);
};

export default SelectField;
