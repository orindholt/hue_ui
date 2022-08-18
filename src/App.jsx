import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./components/MainRouter";
import ColorContextProvider from "./util/ColorContext";

const App = () => {
	return (
		<div className="App flex flex-col py-10">
			<ColorContextProvider>
				<Router>
					<main className="px-10 py-4">
						<MainRouter />
					</main>
				</Router>
			</ColorContextProvider>
		</div>
	);
};

export default App;
