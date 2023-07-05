export const timestampToDate = (timestamp: number): string => {
	const fullDate = new Date(timestamp);
	const date = fullDate.toLocaleDateString();

	return date;
};
