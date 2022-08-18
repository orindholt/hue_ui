import Loader from "../components/Loader";
import RoomBox from "../components/RoomBox";
import useHueApi from "../hooks/useHueApi";

const Home = () => {
	const { data: bulbData, err } = useHueApi({ group: true });

	return bulbData ? (
		<>
			<h1 className="text-left font-semibold text-2xl">Home</h1>
			<h2>All rooms</h2>
			<ul className="grid grid-cols-3 gap-4 my-2">
				{Object.values(bulbData).map((room, i) => {
					room.id = Object.keys(bulbData)[i];
					const { class: name, name: altName, lights, type, id } = room;
					return (
						<RoomBox
							name={name ? name : altName}
							lights={lights}
							type={type}
							id={id}
							key={i}
						/>
					);
				})}
			</ul>
		</>
	) : (
		<Loader errState={err} />
	);
};

export default Home;
