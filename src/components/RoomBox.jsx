import RoomLink from "./RoomLink";
import { motion as m } from "framer-motion";

const RoomBox = ({ name, lights, type }) => {
	return (
		<m.li
			initial={{ y: -10, opacity: 0 }}
			animate={{
				y: 0,
				opacity: 1,
			}}
			className="bg-black text-white border-solid p-4 rounded-md flex flex-col gap-1 items-center shadow-sm"
		>
			<h3 className="text-2xl font-medium">{name}</h3>
			<h4>Type: {type}</h4>
			<div className="flex gap-2">
				{lights.map((light, i) => (
					<RoomLink light={light} key={i} roomName={name} />
				))}
			</div>
		</m.li>
	);
};

export default RoomBox;
