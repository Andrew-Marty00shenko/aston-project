import { TelegramShareButton } from 'react-share';

import type { MovieById } from 'types/movies';

import TelegramSvg from 'assets/icons/telegram.svg';

interface Props {
	movie: MovieById;
}

const ShareTelegram = ({ movie }: Props) => {
	return (
		<div className="flex justify-end">
			<TelegramShareButton
				className="flex items-center !bg-gray !px-4 !py-2 mt-5 rounded-xl"
				url={
					movie.watchability.items.length !== 0
						? `${movie.watchability.items[0].url}`
						: `${window.origin}/movie/${movie.id}`
				}
			>
				Поделиться в telegram
				<img className="w-8 h-8 ml-2" src={TelegramSvg} alt="telegram" />
			</TelegramShareButton>
		</div>
	);
};

export default ShareTelegram;
