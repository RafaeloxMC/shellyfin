import "./App.css";
import Login from "./Login";

function App() {
	if (window.location.pathname === "/login") {
		return (
			<main className="w-full p-16 flex flex-col items-center justify-center">
				<Login />
			</main>
		);
	}

	return (
		<main className="w-full p-16 flex flex-col items-center justify-center">
			<h1>Shellyfin</h1>

			<p className="py-2">
				Shellyfin is a desktop client for Jellyfin written in Tauri!
			</p>

			<button onClick={() => (window.location.href = "/login")}>
				Login to Jellyfin Server
			</button>
		</main>
	);
}

export default App;
