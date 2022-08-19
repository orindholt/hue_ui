import hexRgb from "hex-rgb";
import ColorConverter from "cie-rgb-color-converter";

const hexToXy = hex => {
	const { red: r, green: g, blue: b } = hexRgb(hex);
	let xy = ColorConverter.rgbToXy(r, g, b);
	return xy;
};

export default hexToXy;
