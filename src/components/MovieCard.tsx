import Button from 'elements/Button';

const MovieCard = () => {
	return (
		<div className="flex flex-col justify-between w-[300px] h-[400px] shadow-2xl rounded-2xl p-5">
			<div className="h-1/2 bg-gray rounded-2xl"></div>

			<div>
				<h4>title</h4>
				<p>text</p>
			</div>

			<div>
				<Button className="w-full">Подробнее</Button>
			</div>
		</div>
	);
};

export default MovieCard;
