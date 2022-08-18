import ColorButton from "./ColorButton";
import AddColorButton from "./AddColorButton";
import { useContext } from "react";
import { colorContext } from "../util/ColorContext";

const ColorChooser = ({ buttonConfig }) => {
	const {
		colorOptions: { get: colorOptions },
	} = useContext(colorContext);
	return (
		<div className="flex flex-wrap gap-2 justify-center my-10 py-2">
			{colorOptions.map((color, i) => {
				return <ColorButton hex={color} config={{ ...buttonConfig }} key={i} />;
			})}
			<AddColorButton />
		</div>
	);
};

export default ColorChooser;
