import { useContext, useMemo, useRef } from "react";
import { throttle } from "lodash";
import useHueApi from "../hooks/useHueApi";
import { colorContext } from "../util/ColorContext";

const LightSlider = ({ bulbBriDefault, config = {} }) => {
	const rangeInputRef = useRef(null);
	const { callback: apiCallback } = useHueApi({
		...config,
	});
	const {
		bulbBri: { set: setBulbBri },
	} = useContext(colorContext);

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
				className="appearance-none bg-black h-0.5 w-40 rounded-full my-auto"
				type="range"
				step="1"
				min="0"
				max="254"
				ref={rangeInputRef}
				defaultValue={bulbBriDefault}
				onInput={e => {
					throttledEventHandler();
					setBulbBri(e.target.value);
				}}
			/>
		</div>
	);
};

export default LightSlider;
