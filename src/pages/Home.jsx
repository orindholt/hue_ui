import Loader from "../components/Loader";
import RoomBox from "../components/RoomBox";
import useHueApi from "../hooks/useHueApi";

const Home = () => {
	const { data: bulbData, err } = useHueApi({ group: true });

	return bulbData ? (
		<div>
			<h1 className="text-center font-black text-4xl">Hue Dashboard</h1>
			<h2 className="text-center font-semibold text-2xl">Home</h2>
			<ul className="m-10 grid grid-cols-2 gap-4">
				{Object.values(bulbData).map((room, i) => {
					const { name, lights, type } = room;
					return <RoomBox name={name} lights={lights} type={type} key={i} />;
				})}
			</ul>
		</div>
	) : (
		<Loader errState={err} />
	);
};

export default Home;
