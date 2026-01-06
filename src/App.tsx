import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { Home } from "./Home";

function App() {
	return (
		<main className="w-full p-16 flex flex-col items-center justify-center">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</main>
	);
}

export default App;
