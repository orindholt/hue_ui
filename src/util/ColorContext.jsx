import { createContext, useEffect, useState } from "react";

export const colorContext = createContext({});

const ColorContextProvider = ({ children }) => {
	const [colorOptions, setColorOptions] = useState([
		"#FF9B9B",
		"#94EB9E",
		"#94CAEB",
		"#A594EB",
		"#DE94EB",
		"#EBD094",
	]);
	const [bulbState, setBulbState] = useState(null);
	const [bulbBri, setBulbBri] = useState(null);
	const [bulbColor, setBulbColor] = useState(null);
	const contextValue = {
		colorOptions: { get: colorOptions, set: setColorOptions },
		bulbState: { get: bulbState, set: setBulbState },
		bulbBri: { get: bulbBri, set: setBulbBri },
		bulbColor: { get: bulbColor, set: setBulbColor },
	};
	useEffect(() => {
		localStorage.setItem("savedColors", JSON.stringify(colorOptions));
	}, [colorOptions]);
	return (
		<colorContext.Provider value={contextValue}>
			{children}
		</colorContext.Provider>
	);
};

export default ColorContextProvider;
