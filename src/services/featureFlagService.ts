import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import type { FeatureFlag } from 'types/featureFlag';

export const featureFlagAPI = createApi({
	reducerPath: 'featureFlagAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:8000',
	}),
	endpoints: (build) => ({
		getStatusFeatureFlag: build.query<FeatureFlag, void>({
			query: () => ({
				url: '/api/feature-flags',
			}),
		}),
	}),
});
