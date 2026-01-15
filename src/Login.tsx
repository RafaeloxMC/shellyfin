import { useState, useRef } from "react";

export default function Login() {
	const [address, setAddress] = useState("");
	const [isValid, setValid] = useState(false);
	const [status, setStatus] = useState("Type in a server address...");
	const abortControllerRef = useRef<AbortController | null>(null);

	async function pingLoginSite(serverAddress: string): Promise<boolean> {
		if (!serverAddress.trim()) {
			setStatus("Type in a server address...");
			setValid(false);
			return false;
		}

		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}

		const abortController = new AbortController();
		abortControllerRef.current = abortController;

		try {
			setValid(false);
			setStatus("Pinging " + serverAddress + "...");
			let url = serverAddress;
			if (!url.startsWith("http://") && !url.startsWith("https://")) {
				url = "http://" + url;
			}

			const urlObj = new URL(url);
			if (!urlObj.port) {
				urlObj.port = "8096";
			}

			await fetch(urlObj.toString(), {
				method: "HEAD",
				mode: "no-cors",
				signal: abortController.signal,
			});

			if (abortController.signal.aborted) {
				return false;
			}

			setStatus("Valid server at " + serverAddress + "!");
			setValid(true);
			return true;
		} catch (error) {
			if (error instanceof Error && error.name === "AbortError") {
				return false;
			}

			setValid(false);
			setStatus("Invalid server!");
			return false;
		}
	}

	return (
		<div className="w-full p-16 flex flex-col items-center justify-center">
			<h1>Login</h1>
			<input
				type="text"
				placeholder="Enter server address..."
				onChange={(e) => {
					const newAddress = e.currentTarget.value;
					setAddress(newAddress);
					pingLoginSite(newAddress);
				}}
				className="w-80 text-center my-4"
			></input>

			{isValid ? (
				<p className="text-green-500">{status}</p>
			) : (
				<p className="text-red-500">{status}</p>
			)}

			<button className="mt-4 w-80 min-w-24">Login</button>
		</div>
	);
}
