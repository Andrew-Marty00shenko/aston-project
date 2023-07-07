import type { HistoryResponse, History } from 'types/history';

export const toHistory = (responseData: HistoryResponse) => {
	let history: History[] = [];

	if (responseData) {
		history = Object.entries(responseData).map((item) => ({
			key: item[0],
			name: item[1].name,
			createdAt: item[1].createdAt,
		}));
	}

	return history;
};
