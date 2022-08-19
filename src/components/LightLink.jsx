import { Link } from "react-router-dom";
import useHueApi from "../hooks/useHueApi";
import { motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import LightBulb from "./LightBulb";
import xyToHex from "../util/xyToHex";

const LightLink = ({ light: id }) => {
	const [color, setColor] = useState("#ffffff");
	const { data: bulbData } = useHueApi({ method: "GET", id });

	useEffect(() => {
		if (bulbData) {
			const { xy, bri } = bulbData.state;
			let hexColor = xyToHex(xy, bri);
			setColor(hexColor);
			//console.log(hexColor);
			console.log(bulbData.state.on);
		}
	}, [bulbData]);

	return (
		bulbData && (
			<m.li
				initial={{ y: -10, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				className="bg-white text-black border-2 border-solid border-black rounded-md font-medium px-2 py-1 transition-colors shadow-sm"
			>
				<Link to={`light/${id}`}>
					<div className="flex gap-1">
						{console.log(color)}
						<LightBulb color={color} state={bulbData.state.on} size="30px" />
						<h4 className="text-xl my-auto">{bulbData.name}</h4>
					</div>
				</Link>
			</m.li>
		)
	);
};

export default LightLink;
