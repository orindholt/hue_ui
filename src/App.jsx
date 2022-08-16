import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
	return (
		<div className="App flex flex-col py-10">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/detail/:id" element={<Detail />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
