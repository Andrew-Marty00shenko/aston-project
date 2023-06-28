import PreloaderSvg from 'assets/loaders/preloader.svg';

const Preloader = () => {
	return (
		<div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black-opacity">
			<img
				className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 "
				src={PreloaderSvg}
				alt="preloader"
			/>
		</div>
	);
};

export default Preloader;
