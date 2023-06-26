import { FC } from 'react';

import Public from './Public';
import Private from './Private';

const Routes: FC = () => {
	const isAuth = false;

	return !isAuth ? <Public /> : <Private />;
};

export default Routes;
