import { xyBriToRgb } from "cie-rgb-color-converter";
import rgbHex from "rgb-hex";

const xyToHex = (xy, bri) => {
	const [x, y] = xy;
	let { r, g, b } = xyBriToRgb(x, y, bri);
	if (r > 255) r = 255;
	if (g > 255) g = 255;
	if (b > 255) b = 255;
	let hex = rgbHex(r, g, b);
	return `#${hex}`;
};

export default xyToHex;
