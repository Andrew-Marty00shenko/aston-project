import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { historyAPI } from 'services/historyService';

import { timestampToDate } from 'utils/helpers/timestampToDate';

import type { History } from 'types/history';

import TrashSvg from 'assets/icons/trash.svg';

interface Props {
	item: History;
}

const HistoryItem = ({ item }: Props) => {
	const createdDate = timestampToDate(item.createdAt);
	const [removeHistoryItem] = historyAPI.useRemoveHistoryItemMutation();

	const onRemoveHistoryItem = () => {
		if (window.confirm('Вы уверены, что хотите удалить этот запрос поиска?')) {
			removeHistoryItem({ historyKey: item.key })
				.then(() => toast.success('Вы успешно удалили запрос!'))
				.catch(() => toast.error('Что-то пошло не так!'));
		}
	};

	return (
		<li className="text-2xl font-medium p-5 flex items-center justify-between rounded-2xl hover:bg-gray">
			<Link to={`/search?name=${item.name}`} className="hover:text-orange">
				{item.name}
			</Link>

			<div className="flex items-center">
				<span className="mr-5">{createdDate}</span>
				<img
					onClick={onRemoveHistoryItem}
					className="w-8 h-8 cursor-pointer hover:opacity-70"
					src={TrashSvg}
					alt="trash"
				/>
			</div>
		</li>
	);
};

export default HistoryItem;
