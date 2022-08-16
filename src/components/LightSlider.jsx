import { useMemo, useRef } from "react";
import { throttle } from "lodash";
import useHueApi from "../hooks/useHueApi";

const LightSlider = ({ bulbBrightness, id }) => {
	const rangeInputRef = useRef(null);
	const { callback: apiCallback } = useHueApi({
		id,
		endpoint: "state",
		method: "PUT",
	});

	const changeBulbBrightness = () => {
		const brightness = rangeInputRef.current.value;
		apiCallback({ bri: parseInt(brightness) });
	};

	const throttledEventHandler = useMemo(() => {
		return throttle(changeBulbBrightness, 100);
	}, []);

	return (
		<div className="flex flex-col">
			<h2 className="text-center font-semibold mb-2">Brightness</h2>
			<input
				className="appearance-none bg-black h-0.5 rounded-full my-auto slider"
				type="range"
				step="1"
				min="0"
				max="254"
				ref={rangeInputRef}
				defaultValue={bulbBrightness || 254}
				onInput={throttledEventHandler}
			/>
		</div>
	);
};

export default LightSlider;
