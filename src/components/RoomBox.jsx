import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";

const RoomBox = ({ name, type, id, lights }) => {
	return (
		<Link to={`/room/${id}`}>
			<m.li
				initial={{ y: -10, opacity: 0 }}
				animate={{
					y: 0,
					opacity: 1,
				}}
				className="bg-white border-solid p-4 rounded-md flex flex-col gap-1 items-center shadow-sm cursor-pointer relative"
			>
				<h3 className="text-2xl font-medium">{name}</h3>
				<h4>Type: {type}</h4>
				<p className="text-orange font-medium">
					Light{lights.length > 1 && "s"}: {lights.length}
				</p>
			</m.li>
		</Link>
	);
};

export default RoomBox;
