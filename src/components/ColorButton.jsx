import { useContext } from "react";
import useHueApi from "../hooks/useHueApi";
import { colorContext } from "../util/ColorContext";
import hexToXy from "../util/hexToXy";

const ColorButton = ({ hex, config = {} }) => {
	const { callback: apiCallback } = useHueApi({
		...config,
	});
	const {
		bulbColor: { set: setBulbColor },
	} = useContext(colorContext);

	const changeBulbColor = () => {
		let { x, y } = hexToXy(hex);
		apiCallback({ xy: [x, y] });
		setBulbColor(hex);
	};

	return (
		<button
			onClick={changeBulbColor}
			type="button"
			style={{ backgroundColor: hex }}
			className="w-16 aspect-square bg-white shadow-[0px_0px_10px_#00000010] rounded-full"
		></button>
	);
};

export default ColorButton;
