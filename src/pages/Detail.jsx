import useHueApi from "../hooks/useHueApi";
import Loader from "../components/Loader";
import Switch from "../components/Switch";
import ColorPicker from "../components/ColorPicker";
import LightSlider from "../components/LightSlider";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { motion as m } from "framer-motion";
import ColorButton from "../components/ColorButton";
import AddColorButton from "../components/AddColorButton";
import { useState } from "react";

const Detail = () => {
	const { id } = useParams();
	const { data: bulbData, err } = useHueApi({ id });
	const [colorOptions, setColorOptions] = useState([
		"#FF9B9B",
		"#94EB9E",
		"#94CAEB",
		"#A594EB",
		"#DE94EB",
		"#EBD094",
	]);

	bulbData && bulbData;

	return (
		<>
			<BackButton />
			{bulbData ? (
				<m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
					<h2 className="text-center font-medium text-4xl mb-4">
						{bulbData.name}
					</h2>
					<div className="pb-4 justify-center flex">
						<Switch bulbState={bulbData.state.on} id={id} />
					</div>
					<div className="flex items-stretch justify-center gap-4">
						{/* <ColorPicker
							id={id}
							bulbXyBri={{
								xy: { x: bulbData.state.xy[0], y: bulbData.state.xy[1] },
								bri: bulbData.state.bri,
							}}
						/> */}
						<LightSlider bulbBrightness={bulbData.state.bri} id={id} />
					</div>
					<div className="flex flex-wrap gap-2 justify-center my-10">
						{colorOptions.map((color, i) => {
							return <ColorButton hex={color} id={id} key={i} />;
						})}
						<AddColorButton setterFunc={setColorOptions} />
					</div>
				</m.div>
			) : (
				<Loader errState={err} />
			)}
		</>
	);
};

export default Detail;
