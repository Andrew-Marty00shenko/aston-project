interface Props {
	url: string;
	name: string;
	linkIcon: string;
}

const MovieWatchabilityItem = ({ url, name, linkIcon }: Props) => {
	return (
		<li className="mt-4">
			<a
				className="flex justify-center items-center hover:text-red"
				href={url}
				target="_blank"
				rel="noreferrer"
			>
				<img className="w-10 h-10 rounded-lg mr-2" src={linkIcon} alt="link" />
				{name}
			</a>
		</li>
	);
};

export default MovieWatchabilityItem;
