import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { useAppSelector } from 'hooks/redux';

import { historyAPI } from 'services/historyService';

import HistoryItem from 'components/HistoryItem';
import Preloader from 'components/Preloader';

import Button from 'elements/Button';

const History = () => {
	const isAuth = useAppSelector((state) => state.auth.isAuth);
	const [getHistory, { data: history, isLoading }] =
		historyAPI.useLazyGetHistoryQuery();
	const [removeAllHistory, { isLoading: loadingRemoveAll }] =
		historyAPI.useRemoveAllHistoryMutation();

	useEffect(() => {
		if (isAuth) {
			getHistory();
		}
	}, [isAuth]);

	const onRemoveAllHistory = () => {
		if (
			window.confirm('Вы уверены, что хотите удалить всю историю запросов?')
		) {
			removeAllHistory()
				.then(() => toast.success('Вы успешно удалили всю историю запросов!'))
				.catch(() => toast.error('Что-то пошло не так!'));
		}
	};

	if (isLoading) {
		return <Preloader />;
	}

	return !history ? null : (
		<main className="mx-auto bg-white p-10 w-[1200px] my-28 rounded-2xl">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">История запросов: </h2>
				{history.length === 0 ? (
					''
				) : (
					<div className="flex justify-end mb-5">
						<Button onClick={onRemoveAllHistory} disabled={loadingRemoveAll}>
							Очистить историю
						</Button>
					</div>
				)}
			</div>

			<ul>
				{history.length === 0 ? (
					<p className="mt-10">
						Здесь пока ничего нет.{' '}
						<Link className="underline text-orange" to="/">
							Перейти к поиску
						</Link>
					</p>
				) : (
					history.map((item) => {
						return <HistoryItem key={item.key} item={item} />;
					})
				)}
			</ul>
		</main>
	);
};

export default History;
