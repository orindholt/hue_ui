import { useLayoutEffect, useRef, useState } from "react";
import { IoAdd } from "react-icons/io5";

const AddColorButton = ({ setterFunc }) => {
	const colorPickerRef = useRef(null);
	const [open, setOpen] = useState(false);

	useLayoutEffect(() => {
		console.log(colorPickerRef.current);
		if (colorPickerRef.current) colorPickerRef.current.click();
	}, [open]);

	return (
		<div className="relative">
			<button
				onClick={() => setOpen(!open)}
				type="button"
				className="w-16 aspect-square bg-white shadow-sm rounded-full grid place-content-center text-4xl border-2 border-black border-solid"
			>
				<IoAdd />
			</button>
			{open && (
				<div className="absolute -top-6 -right-6">
					<input
						type="color"
						name="colorPicker"
						id="colorPicker"
						className="hidden"
						ref={colorPickerRef}
					/>
				</div>
			)}
		</div>
	);
};

export default AddColorButton;
