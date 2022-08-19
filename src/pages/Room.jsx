import { useParams } from "react-router-dom";
import { motion as m } from "framer-motion";
import LightLink from "../components/LightLink";
import useHueApi from "../hooks/useHueApi";
import Loader from "../components/Loader";
import LightSlider from "../components/LightSlider";
import ColorChooser from "../components/ColorChooser";
import Switch from "../components/Switch";

const Room = () => {
	const { id } = useParams();

	const { data: bulbData, err } = useHueApi({
		id,
		group: true,
	});

	return bulbData ? (
		<>
			<m.div
				initial={{ y: -10, opacity: 0 }}
				animate={{
					y: 0,
					opacity: 1,
				}}
				className="bg-white border-solid p-4 rounded-md flex flex-col gap-1 items-center"
			>
				<h1 className="text-6xl font-medium">
					{bulbData.class ? bulbData.class : bulbData.name}
				</h1>
				<h2 className="text-2xl text-gray-400">Type: {bulbData.type}</h2>
				<ul className="flex gap-2">
					{bulbData.lights.map((light, i) => (
						<LightLink light={light} key={i} roomName={bulbData.name} />
					))}
				</ul>
				<div className="mt-4">
					<div className="pb-4 justify-center flex">
						<Switch
							bulbStateDefault={bulbData.action.on}
							config={{
								id,
								method: "PUT",
								group: true,
							}}
						/>
					</div>
					<div className="flex items-stretch justify-center gap-4">
						<LightSlider
							bulbBriDefault={bulbData.action.bri}
							config={{ id, group: true, method: "PUT" }}
						/>
					</div>
					<ColorChooser
						buttonConfig={{
							group: true,
							method: "PUT",
							id,
						}}
					/>
				</div>
			</m.div>
		</>
	) : (
		<Loader errState={err} />
	);
};

export default Room;
