import { useContext, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { SketchPicker } from "react-color";
import { colorContext } from "../util/ColorContext";

const AddColorButton = () => {
	const {
		colorOptions: { get: colorOptions, set: setColorOptions },
	} = useContext(colorContext);
	const [overlayState, setOverlayState] = useState(false);
	const [colorPickerValue, setColorPickerValue] = useState("#000000");

	const closeOverlay = () => setOverlayState(false);

	const addColor = () => {
		setColorOptions([...colorOptions, colorPickerValue]);
		closeOverlay();
	};

	return (
		<div className="relative">
			<button
				onClick={() => setOverlayState(!overlayState)}
				type="button"
				className="w-16 aspect-square bg-gray-100 shadow-sm rounded-full grid place-content-center text-4xl"
			>
				<IoAdd />
			</button>
			{overlayState && (
				<div className="absolute top-10 -right-52 flex flex-col shadow-md border rounded-md overflow-hidden p-1 bg-white">
					<SketchPicker
						className="!shadow-none !bg-transparent"
						onChange={e => setColorPickerValue(e.hex)}
						color={colorPickerValue}
					/>
					<div className="w-full flex justify-between">
						<button type="button" onClick={closeOverlay}>
							Cancel
						</button>
						<button type="button" className="text-green-400" onClick={addColor}>
							Add
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddColorButton;
