import hexRgb from "hex-rgb";
import rgbHex from "rgb-hex";
import ColorConverter from "cie-rgb-color-converter";
import { useRef, useMemo } from "react";
import { xyBriToRgb } from "cie-rgb-color-converter";
import { throttle } from "lodash";
import useHueApi from "../hooks/useHueApi";
import hexToXy from "../util/hexToXy";

const ColorPicker = ({ bulbXyBri, id }) => {
	const { callback: apiCallback } = useHueApi({
		group: false,
		method: "PUT",
		id,
	});
	const colorInputRef = useRef(null);
	const defaultColorRgb = xyBriToRgb(
		bulbXyBri.xy.x,
		bulbXyBri.xy.y,
		bulbXyBri.bri
	);

	const changeBulbColor = () => {
		const hexColor = colorInputRef.current.value;
		let { x, y } = hexToXy(hexColor);
		apiCallback({ xy: [x, y] });
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
