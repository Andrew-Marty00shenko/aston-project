import { ReactNode, createContext, useContext, useMemo } from 'react';

import { featureFlagAPI } from 'services/featureFlagService';

import type { FeatureFlag } from 'types/featureFlag';

export const FeatureFlagContext = createContext<FeatureFlag>({
	isTelegramShareEnabled: false,
});

interface Props {
	children: ReactNode;
}

const FeatureFlagProvider = ({ children }: Props) => {
	const { data } = featureFlagAPI.useGetStatusFeatureFlagQuery();

	const contextValue = useMemo(() => {
		if (data) {
			return data;
		}
		return { isTelegramShareEnabled: false };
	}, [data]);

	return (
		<FeatureFlagContext.Provider value={contextValue}>
			{children}
		</FeatureFlagContext.Provider>
	);
};

export default FeatureFlagProvider;

export const useFeatureFlag = () => useContext<FeatureFlag>(FeatureFlagContext);
