import useHueApi from "../hooks/useHueApi";
import Loader from "../components/Loader";
import Switch from "../components/Switch";
import LightSlider from "../components/LightSlider";
import { useParams } from "react-router-dom";
import { motion as m } from "framer-motion";
import ColorChooser from "../components/ColorChooser";
import { useEffect } from "react";

const Light = () => {
	const { id } = useParams();
	const { data: bulbData, err } = useHueApi({ id });

	const [bulbState, setBulbState] = useState(null);
	const [bulbBri, setBulbBri] = useState(null);
	/* const [bulbColor, setBulbColor] = useState(null); */

	useEffect(() => {
		setBulbState(bulbData.state.on);
		setBulbBri(bulbData.state.bri);
		/* setBulbColor(bulbData.state.xy) */
	}, []);

	return (
		<>
			{bulbData ? (
				<m.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="bg-white rounded-md shadow-sm py-4"
				>
					<h2 className="text-center font-medium text-4xl mb-4">
						{bulbData.name}
					</h2>
					<div className="pb-4 justify-center flex">
						<Switch bulbState={bulbState} config={{ id, method: "PUT" }} />
					</div>
					<div className="flex items-stretch justify-center gap-4">
						<LightSlider
							bulbBrightness={bulbBri}
							config={{ id, method: "PUT" }}
						/>
					</div>
					<ColorChooser
						buttonConfig={{
							group: false,
							method: "PUT",
							id,
						}}
					/>
				</m.div>
			) : (
				<Loader errState={err} />
			)}
		</>
	);
};

export default Light;
