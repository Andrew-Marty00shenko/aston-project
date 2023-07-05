import type { HistoryResponse, History } from 'types/history';

export const toHistory = (responseData: HistoryResponse) => {
	const history: History[] = [];

	for (const key in responseData) {
		history.push({ ...responseData[key], key });
	}

	return history;
};
