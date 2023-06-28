import { Dispatch, SetStateAction } from 'react';
import ReactPaginate from 'react-paginate';

interface Props {
	pagesCount: number;
	setPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ pagesCount, setPage }: Props) => {
	const handlePageClick = (event: { selected: number }) => {
		setPage(event.selected + 1);
	};

	return (
		<div className="mt-10 flex justify-end">
			<ReactPaginate
				breakLabel="..."
				containerClassName="flex items-center"
				pageClassName="flex justify-center items-center mx-2 bg-orange h-10 px-4 rounded-md text-white"
				nextClassName="flex justify-center items-center mx-2 bg-orange h-10 px-4 rounded-md"
				previousClassName="flex justify-center items-center mx-2 bg-orange h-10 px-4 rounded-md"
				activeClassName="flex justify-center items-center mx-2 bg-primary h-10 px-4 rounded-md"
				activeLinkClassName="flex justify-center items-center mx-2 bg-primary h-10 px-4 rounded-md"
				disabledClassName="flex justify-center items-center mx-2 bg-disabled w-10 h-10 rounded-md"
				nextLabel={
					<svg
						width="15"
						height="6"
						viewBox="0 0 15 6"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M14.0314 3L9.03137 0.113249V5.88675L14.0314 3ZM0 3.5H9.53137V2.5H0L0 3.5Z"
							fill="#ffffff"
						/>
					</svg>
				}
				onPageChange={handlePageClick}
				marginPagesDisplayed={1}
				pageRangeDisplayed={1}
				pageCount={pagesCount}
				previousLabel={
					<svg
						width="15"
						height="6"
						viewBox="0 0 15 6"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0.968629 3L5.96863 5.88675V0.113249L0.968629 3ZM15 2.5L5.46863 2.5V3.5L15 3.5V2.5Z"
							fill="#ffffff"
						/>
					</svg>
				}
				renderOnZeroPageCount={() => null}
			/>
		</div>
	);
};

export default Pagination;
