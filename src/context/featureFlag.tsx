import { createContext, useEffect, useState } from 'react';

import { featureFlagAPI } from 'services/featureFlagService';

export interface FeatureFlag {
	isFeatureFlag: boolean;
}

export const FeatureFlagContext = createContext<FeatureFlag | null>(null);

const FeatureFlagProvider = ({ children }: any) => {
	const [isFeatureFlag, setIsFeatureFlag] = useState(false);
	const { data } = featureFlagAPI.useGetStatusFeatureFlagQuery();

	useEffect(() => {
		if (data) {
			setIsFeatureFlag(data.isTelegramShareEnabled);
		}
	}, [data]);

	return (
		<FeatureFlagContext.Provider value={{ isFeatureFlag }}>
			{children}
		</FeatureFlagContext.Provider>
	);
};

export default FeatureFlagProvider;
