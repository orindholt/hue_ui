const Loader = ({ errState }) => {
	return (
		<aside className="absolute top-0 bottom-0 left-0 right-0 grid place-content-center pointer-events-none">
			{!errState ? (
				<div className="bg-white text-black font-bold uppercase px-2 py-1 animate-bounce rounded-sm">
					Loading...
				</div>
			) : (
				<div className="font-bold text-red-600">{errState.message}!</div>
			)}
		</aside>
	);
};

export default Loader;
