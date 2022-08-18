import { xyBriToRgb } from "cie-rgb-color-converter";
import rgbHex from "rgb-hex";
import { Link } from "react-router-dom";
import useHueApi from "../hooks/useHueApi";
import { motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import checkContrast from "../util/checkContrast";
import LightBulb from "./LightBulb";

const LightLink = ({ light }) => {
	const [color, setColor] = useState("#ffffff");
	const { data: bulbData } = useHueApi({ method: "GET", id: light });

	useEffect(() => {
		if (bulbData && bulbData.state && bulbData.state.xy && bulbData.state.bri) {
			const { xy, bri } = bulbData.state;
			let rgbColor = xyBriToRgb(xy[0], xy[1], bri);
			if (rgbColor.r > 255) rgbColor.r = 255;
			if (rgbColor.g > 255) rgbColor.g = 255;
			if (rgbColor.b > 255) rgbColor.b = 255;
			let hexColor = rgbHex(rgbColor.r, rgbColor.g, rgbColor.b);
			setColor(`#${hexColor}`);
		}
	}, [bulbData]);

	return (
		bulbData && (
			<m.li
				initial={{ y: -10, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				className="bg-white text-black border-2 border-solid border-black rounded-md font-medium px-2 py-1 transition-colors shadow-sm"
			>
				<Link to={`light/${light}`}>
					<div className="flex gap-1">
						<LightBulb color={bulbData.state.on ? color : "#000"} size="30px" />
						<h4 className="text-xl my-auto">{bulbData.name}</h4>
					</div>
				</Link>
			</m.li>
		)
	);
};

export default LightLink;
