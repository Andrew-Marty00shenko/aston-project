import { createContext, Dispatch, SetStateAction } from 'react';

interface FeatureFlag {
	isFeatureFlag: boolean;
	setIsFeatureFlag: Dispatch<SetStateAction<boolean>>;
}

export const FeatureFlagContext = createContext<FeatureFlag>({
	isFeatureFlag: false,
	setIsFeatureFlag: () => {},
});
