import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	createApi,
	fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query/react';

import { toHistory } from './transformResponses/historyTransformResponse';

import type { History, HistoryForm } from 'types/history';
import type { RootState } from 'redux/store';

const rawBaseQuery = fetchBaseQuery({
	baseUrl: 'https://aston-movies-default-rtdb.firebaseio.com/',
});

const dynamicBaseQuery: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const {
		auth: { token, uid },
	} = api.getState() as RootState;

	if (!uid || !token) {
		return {
			error: {
				status: 400,
				statusText: 'Bad Request',
				data: 'No token or uid',
			},
		};
	}

	const urlEnd = typeof args === 'string' ? args : args.url;
	const adjustedUrl = `${uid}/${urlEnd}?auth=${token}`;
	const adjustedArgs =
		typeof args === 'string' ? adjustedUrl : { ...args, url: adjustedUrl };

	return rawBaseQuery(adjustedArgs, api, extraOptions);
};

export const historyAPI = createApi({
	reducerPath: 'historyAPI',
	baseQuery: dynamicBaseQuery,
	tagTypes: ['History'],
	endpoints: (build) => {
		return {
			getHistory: build.query<History[], void>({
				query: () => ({
					url: `history.json`,
				}),
				transformResponse: toHistory,
				providesTags: ['History'],
			}),
			createHistory: build.mutation<void, HistoryForm>({
				query: ({ name, createdAt }) => ({
					url: `history.json`,
					method: 'POST',
					body: { name, createdAt },
				}),
				invalidatesTags: ['History'],
			}),
			removeHistoryItem: build.mutation<void, { historyKey: string }>({
				query: ({ historyKey }) => ({
					url: `history/${historyKey}.json`,
					method: 'DELETE',
				}),
				invalidatesTags: ['History'],
			}),
			removeAllHistory: build.mutation<void, void>({
				query: () => ({
					url: `history.json`,
					method: 'DELETE',
				}),
				invalidatesTags: ['History'],
			}),
		};
	},
});
