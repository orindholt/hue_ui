import useHueApi from "../hooks/useHueApi";
import Loader from "../components/Loader";
import Switch from "../components/Switch";
import LightSlider from "../components/LightSlider";
import { useParams } from "react-router-dom";
import { motion as m } from "framer-motion";
import ColorChooser from "../components/ColorChooser";
import { useContext, useEffect } from "react";
import LightBulb from "../components/LightBulb";
import xyToHex from "../util/xyToHex";
import { colorContext } from "../util/ColorContext";

const Light = () => {
	const { id } = useParams();
	const { data: bulbData, err } = useHueApi({ id });

	const {
		bulbState: { get: bulbState, set: setBulbState },
		bulbBri: { get: bulbBri, set: setBulbBri },
		bulbColor: { get: bulbColor, set: setBulbColor },
	} = useContext(colorContext);

	useEffect(() => {
		if (bulbData) {
			const { on, xy, bri } = bulbData.state;
			setBulbState(on);
			setBulbBri(bri);
			setBulbColor(xyToHex(xy, bri));
		}
	}, [bulbData]);

	return (
		<>
			{bulbData && bulbState !== null ? (
				<m.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="bg-white rounded-md shadow-sm py-4"
				>
					<div className="flex justify-center mb-4">
						<LightBulb
							size="200px"
							state={bulbState}
							color={bulbColor}
							bri={bulbBri}
						/>
					</div>
					<h2 className="text-center font-medium text-4xl mb-4">
						{bulbData.name}
					</h2>
					<div className="pb-4 justify-center flex">
						<Switch
							bulbStateDefault={bulbData.state.on}
							config={{ id, method: "PUT" }}
						/>
					</div>
					<div className="flex items-stretch justify-center gap-4">
						<LightSlider
							bulbBriDefault={bulbData.state.bri}
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
