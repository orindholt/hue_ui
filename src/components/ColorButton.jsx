import useHueApi from "../hooks/useHueApi";
import hexRgb from "hex-rgb";
import ColorConverter from "cie-rgb-color-converter";

const ColorButton = ({ hex, id }) => {
	const { callback: apiCallback } = useHueApi({
		group: false,
		method: "PUT",
		id,
		endpoint: "state",
	});

	const changeBulbColor = () => {
		const { red: r, green: g, blue: b } = hexRgb(hex);
		let xy = ColorConverter.rgbToXy(r, g, b);
		apiCallback({ xy: [xy.x, xy.y] });
	};

	return (
		<button
			onClick={changeBulbColor}
			type="button"
			style={{ backgroundColor: hex }}
			className="w-16 aspect-square bg-white shadow-sm rounded-full"
		></button>
	);
};

export default ColorButton;
