import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { toHistory } from './transformResponses/historyTransformResponse';

import type { History, HistoryForm } from 'types/history';

export const historyAPI = createApi({
	reducerPath: 'historyAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://aston-movies-default-rtdb.firebaseio.com/',
	}),
	tagTypes: ['History'],
	endpoints: (build) => {
		const { uid, token }: { uid: string; token: string } = JSON.parse(
			localStorage.getItem('user') as string
		);

		return {
			getHistory: build.query<History[], void>({
				query: () => ({
					url: `${uid}/history.json`,
					params: { auth: token },
				}),
				transformResponse: toHistory,
				providesTags: ['History'],
			}),
			createHistory: build.mutation<void, HistoryForm>({
				query: ({ name, createdAt }) => ({
					url: `${uid}/history.json`,
					params: { auth: token },
					method: 'POST',
					body: { name, createdAt },
				}),
				invalidatesTags: ['History'],
			}),
			removeHistoryItem: build.mutation<void, { historyKey: string }>({
				query: ({ historyKey }) => ({
					url: `${uid}/history/${historyKey}.json`,
					method: 'DELETE',
				}),
				invalidatesTags: ['History'],
			}),
			removeAllHistory: build.mutation<void, void>({
				query: () => ({
					url: `${uid}/history.json`,
					method: 'DELETE',
				}),
				invalidatesTags: ['History'],
			}),
		};
	},
});
