import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Light from "../pages/Light";
import Room from "../pages/Room";
import BackButton from "./BackButton";

const MainRouter = () => {
	const { pathname } = useLocation();

	return (
		<>
			{pathname !== "/" && <BackButton />}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/room/:id" element={<Room />} />
				<Route path="/room/:id/light/:id" element={<Light />} />
			</Routes>
		</>
	);
};

export default MainRouter;
