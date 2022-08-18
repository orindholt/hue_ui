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
	const contextValue = {
		colorOptions: { get: colorOptions, set: setColorOptions },
	};
	useEffect(() => {
		console.log(colorOptions);
		localStorage.setItem("savedColors", JSON.stringify(colorOptions));
	}, [colorOptions]);
	return (
		<colorContext.Provider value={contextValue}>
			{children}
		</colorContext.Provider>
	);
};

export default ColorContextProvider;
