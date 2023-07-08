import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<main className="mx-auto bg-white w-[1200px] p-10 my-28 rounded-2xl">
			<h2 className="text-center font-bold text-3xl">404 Not found</h2>

			<div className="w-full mt-5 text-center">
				<Link className="text-orange underline" to="/">
					На главную
				</Link>
			</div>
		</main>
	);
};

export default NotFound;
