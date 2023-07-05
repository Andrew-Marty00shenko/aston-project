export interface HistoryForm {
	name: string;
	createdAt: number;
}

export interface HistoryResponse {
	[key: string]: History;
}

export interface History {
	key: string;
	name: string;
	createdAt: number;
}
