import { xyBriToRgb } from "cie-rgb-color-converter";
import rgbHex from "rgb-hex";
import { Link } from "react-router-dom";
import useHueApi from "../hooks/useHueApi";
import { motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import checkContrast from "../util/checkContrast";

const RoomLink = ({ light }) => {
	const [color, setColor] = useState("#ffffff");
	const { data: bulbData } = useHueApi({ method: "GET", id: light });

	useEffect(() => {
		if (bulbData && bulbData.state && bulbData.state.xy && bulbData.state.bri) {
			const { xy, bri } = bulbData.state;
			let rgbColor = xyBriToRgb(xy[0], xy[1], bri);
			if (rgbColor.r > 256) rgbColor.r = 256;
			if (rgbColor.g > 256) rgbColor.g = 256;
			if (rgbColor.b > 256) rgbColor.b = 256;
			let hexColor = rgbHex(rgbColor.r, rgbColor.g, rgbColor.b);
			setColor(`#${hexColor}`);
		}
	}, [bulbData]);

	return (
		bulbData && (
			<m.div
				initial={{ y: -10, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				className="bg-black text-white rounded-md font-medium px-2 transition-colors border border-white border-solid shadow-sm"
				style={{
					backgroundColor: color,
					color: checkContrast(color) ? "#000" : "#fff",
				}}
			>
				<Link to={`detail/${light}`}>{bulbData.name}</Link>
			</m.div>
		)
	);
};

export default RoomLink;
