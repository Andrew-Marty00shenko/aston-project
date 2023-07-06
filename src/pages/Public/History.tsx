import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { historyAPI } from 'services/historyService';

import HistoryItem from 'components/HistoryItem';
import Preloader from 'components/Preloader';

import Button from 'elements/Button';

const History = () => {
	const { data: history, isLoading } = historyAPI.useGetHistoryQuery();
	const [removeAllHistory] = historyAPI.useRemoveAllHistoryMutation();

	const onRemoveAllHistory = () => {
		if (
			window.confirm('Вы уверены, что хотите удалить всю историю запросов?')
		) {
			removeAllHistory()
				.then(() => toast.success('Вы успешно удалили всю историю запросов!'))
				.catch(() => toast.error('Что-то пошло не так!'));
		}
	};

	if (isLoading || !history) {
		return <Preloader />;
	}

	return (
		<main className="mx-auto bg-white p-10 w-[1200px] my-28 rounded-2xl">
			<h2 className="text-2xl font-bold">История запросов: </h2>
			{history.length === 0 ? (
				''
			) : (
				<div className="flex justify-end mb-5">
					<Button onClick={onRemoveAllHistory}>Очистить историю</Button>
				</div>
			)}

			<ul>
				{history.length === 0 ? (
					<p>
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
