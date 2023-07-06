import { useCallback, useEffect, useState } from 'react';

type Value<T> = T | null;

export function useReadLocalStorage<T>(key: string): Value<T> {
	const readValue = useCallback((): Value<T> => {
		if (typeof window === 'undefined') {
			return null;
		}

		try {
			const item = window.localStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : null;
		} catch (error) {
			return null;
		}
	}, [key]);

	const [storedValue, setStoredValue] = useState<Value<T>>(readValue);

	useEffect(() => {
		setStoredValue(readValue());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return storedValue;
}
