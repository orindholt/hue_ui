import hexRgb from "hex-rgb";
import rgbHex from "rgb-hex";
import ColorConverter from "cie-rgb-color-converter";
import { useRef, useMemo } from "react";
import { xyBriToRgb } from "cie-rgb-color-converter";
import { throttle } from "lodash";
import useHueApi from "../hooks/useHueApi";

const ColorPicker = ({ bulbXyBri, id }) => {
	const { callback: apiCallback } = useHueApi({
		group: false,
		method: "PUT",
		id,
		endpoint: "state",
	});
	const colorInputRef = useRef(null);
	const defaultColorRgb = xyBriToRgb(
		bulbXyBri.xy.x,
		bulbXyBri.xy.y,
		bulbXyBri.bri
	);

	const changeBulbColor = () => {
		const color = colorInputRef.current.value;
		const { red: r, green: g, blue: b } = hexRgb(color);
		let xy = ColorConverter.rgbToXy(r, g, b);
		apiCallback({ xy: [xy.x, xy.y] });
	};

	const throttledEventHandler = useMemo(() => {
		return throttle(changeBulbColor, 100);
	}, []);

	return (
		<div>
			<h2 className="text-center font-semibold mb-2">Color</h2>
			<input
				type="color"
				ref={colorInputRef}
				defaultValue={`#${rgbHex(
					defaultColorRgb.r,
					defaultColorRgb.g,
					defaultColorRgb.b
				)}`}
				onInput={() => throttledEventHandler()}
			/>
		</div>
	);
};

export default ColorPicker;
