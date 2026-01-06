import { useNavigate } from "react-router-dom";

export function Home() {
	const navigate = useNavigate();
	return (
		<>
			<h1>Shellyfin</h1>
			<p className="py-2">
				Shellyfin is a desktop client for Jellyfin written in Tauri!
			</p>
			<button onClick={() => navigate("/login")}>
				Login to Jellyfin Server
			</button>
		</>
	);
}
