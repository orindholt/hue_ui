import { useContext, useEffect } from "react";
import { useState } from "react";
import useHueApi from "../hooks/useHueApi";
import { motion as m } from "framer-motion";
import { colorContext } from "../util/ColorContext";

const Switch = ({ bulbStateDefault, config = {} }) => {
	const [on, setOn] = useState(bulbStateDefault);
	const { callback: apiCallback } = useHueApi({
		...config,
	});
	const {
		bulbState: { set: setBulbState },
	} = useContext(colorContext);

	useEffect(() => {
		apiCallback({ on: on });
		setBulbState(on);
	}, [on]);

	return (
		<m.button
			type="button"
			onClick={() => setOn(!on)}
			className="text-3xl bg-black flex rounded-lg w-20 h-9 items-center p-1 shadow-sm"
			animate={{
				justifyContent: on ? "flex-start" : "flex-end",
				backgroundColor: on ? "#7cfa6e" : "#000000",
			}}
		>
			<div className="h-full bg-white rounded-md aspect-square transition-all"></div>
		</m.button>
	);
};

export default Switch;
