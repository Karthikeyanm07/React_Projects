import { CircleAlert } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const PasswordGenerator = () => {
	const [length, setLength] = useState(0);
	const [includeUpper, setIncludeUpper] = useState(true);
	const [includeLower, setIncludeLower] = useState(true);
	const [includeNumbers, setIncludeNumbers] = useState(true);
	const [includeSymbols, setIncludeSymbols] = useState(true);
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(false);

	function handleInput() {
		const lengthNum = parseInt(length);
		if (isNaN(lengthNum) || lengthNum <= 0 || lengthNum > 128) {
			setErrorMessage(true);
			return; // Stop execution
		}

		let charSet = "";
		if (includeUpper) {
			charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		}
		if (includeLower) {
			charSet += "abcdefghijklmnopqrstuvwxyz";
		}
		if (includeNumbers) {
			charSet += "0123456789";
		}
		if (includeSymbols) {
			charSet += "!@#$%^&*()-_=+";
		}
		//console.log(charSet);
		let generatedPassword = "";
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * charSet.length);
			generatedPassword += charSet[randomIndex];
		}
		setErrorMessage(false);
		setPassword(generatedPassword);
	}

	function copyToClipBoard() {
		navigator.clipboard.writeText(password);
		toast.success("Password copied to clipboard");
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-300">
			<Toaster position="top-center" />
			<div className="bg-white p-6 w-full max-w-lg rounded shadow-2xl mx-2">
				<h1 className="text-center text-blue-600 text-2xl font-semibold mb-4">
					STRONG PASSWORD GENERATOR
				</h1>
				<div className="mb-4">
					<label
						htmlFor="passwordLength"
						className="font-semibold text-xl block mb-2"
					>
						Password Length:
					</label>
					<input
						type="number"
						id="passwordLength"
						placeholder="Type length..."
						className="
                        px-2 py-2.5 w-full border focus:outline-none rounded-lg
                        border-blue-400 focus:border-blue-600 transition-colors mb-2"
						onChange={(e) => setLength(e.target.value)}
					/>
					{errorMessage && (
						<div className="flex text-red-500 items-center gap-2 justify-start">
							<CircleAlert className="w-4 h-4" />
							<p className="text-[14px]">Enter valid length</p>
						</div>
					)}
				</div>
				<div className="my-2">
					<div className="py-1">
						<label htmlFor="uppercase" className="">
							<input
								type="checkbox"
								id="uppercase"
								className="mr-2"
								checked={includeUpper}
								onChange={(e) =>
									setIncludeUpper(e.target.checked)
								}
							/>
							Include Uppercase
						</label>
					</div>
					<div className="py-1">
						<label htmlFor="lowercase">
							<input
								type="checkbox"
								id="lowercase"
								className="mr-2"
								checked={includeLower}
								onChange={(e) =>
									setIncludeLower(e.target.checked)
								}
							/>
							Include Lowercase
						</label>
					</div>
					<div className="py-1">
						<label htmlFor="numbers">
							<input
								type="checkbox"
								id="numbers"
								className="mr-2"
								checked={includeNumbers}
								onChange={(e) =>
									setIncludeNumbers(e.target.checked)
								}
							/>
							Include Numbers
						</label>
					</div>
					<div className="py-1">
						<label htmlFor="symbols">
							<input
								type="checkbox"
								id="symbols"
								className="mr-2"
								checked={includeSymbols}
								onChange={(e) =>
									setIncludeSymbols(e.target.checked)
								}
							/>
							Include Symbols
						</label>
					</div>
				</div>
				<button
					className="
                    bg-blue-500 px-4 py-2 rounded-lg text-white cursor-pointer 
                    hover:bg-blue-600 transition-all hover:scale-x-101 my-2"
					onClick={handleInput}
				>
					Generate Password
				</button>
				<div className="flex gap-2">
					<input
						type="text"
						className="
                            flex-1 px-4 py-2.5 
                            border border-gray-400 rounded-lg
                            focus:outline-none focus:border-blue-500"
						readOnly
						placeholder="Get password here"
						value={password}
					/>
					<button
						className="
                            px-6 py-2.5 
                            bg-blue-500 hover:bg-blue-600
                            text-white font-medium rounded-lg
                            transition-colors whitespace-nowrap"
						onClick={copyToClipBoard}
					>
						Copy
					</button>
				</div>
			</div>
		</div>
	);
};

export default PasswordGenerator;
