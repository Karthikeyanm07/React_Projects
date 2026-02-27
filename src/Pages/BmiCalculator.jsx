import "./App.css";
import bmi_cover_image from "../assets/bmi_cover_image.png";
import { useState } from "react";
import { CircleAlert } from "lucide-react";

const BmiCalculator = () => {
	const [height, setHeight] = useState("");
	const [weight, setWeight] = useState("");
	const [bmi, setBMI] = useState(0);
	const [category, setCateogry] = useState("");
	const [result, setResult] = useState(false);
	const [error, setError] = useState(false);
	const [isVibrating, setIsVibrating] = useState(false);

	function calculateBMI() {
		let inputHeight = parseFloat(height);
		let inputWeight = parseFloat(weight);

		if (
			!inputHeight ||
			!inputWeight ||
			inputHeight <= 0 ||
			inputWeight <= 0
		) {
			setError(true);
			return;
		}

		//console.log(error)

		if (result && bmi > 0) {
			setIsVibrating(true);
			if ("vibrate" in navigator) navigator.vibrate(200); // Phone vibration
			setTimeout(() => setIsVibrating(false), 500); // Reset animation
			return;
		}

		// Calclate BMI
		let calculatedBMI = (inputWeight / (inputHeight * inputHeight)) * 10000;
		calculatedBMI = parseFloat(calculatedBMI.toFixed(2));
		setBMI(calculatedBMI);

		if (calculatedBMI < 18.5) {
			setCateogry("Underweight");
		} else if (calculatedBMI < 25) {
			setCateogry("Healthy weight");
		} else if (calculatedBMI < 30) {
			setCateogry("Overweight");
		} else {
			setCateogry("Obese");
		}
		setError(false);
		setResult(true);
	}

	function clearInputs() {
		setWeight("");
		setHeight("");
		setResult(false);
		setError(false);
	}
	return (
		<div className="bg-blue-600/30 min-h-screen flex justify-center items-center w-full">
			<div className="bg-white w-full md:max-w-2xl mx-4 rounded-xl shadow-2xl">
				<div className="grid md:grid-cols-2 gap-6 p-4">
					<div className="h-full">
						<img
							src={bmi_cover_image}
							alt="cover_image"
							className="w-full h-full object-contain"
						/>
					</div>
					<div>
						<h2 className="font-semibold text-blue-600">
							BMI CALCULATOR
						</h2>
						{error && (
							<div className="flex items-center justify-center gap-1 bg-red-400/20 rounded my-2 p-1">
								<CircleAlert className="w-2 h-2 text-red-500" />
								<p className="text-red-500 text-[12px]">
									Enter valid inputs for height and weight
								</p>
							</div>
						)}

						<div>
							<label
								htmlFor="height"
								className="font-medium text-gray-400 text-xs"
							>
								Height (cm):
							</label>
							<input
								type="number"
								name="height"
								id="height"
								placeholder="Enter height"
								className="w-full border rounded border-gray-300 focus:border-gray-500 focus:outline-none px-2 py-1.5 
                                text-[10px] mb-2 transition-colors [appearance:textfield] [&::-webkit-inner-spin-button]:m-0 
                                [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
								value={height}
								onChange={(e) => setHeight(e.target.value)}
								min={1}
								max={300}
							/>
						</div>
						<div>
							<label
								htmlFor="weight"
								className="font-medium text-gray-400 text-xs"
							>
								Weight (kg):
							</label>
							<input
								type="number"
								name="weight"
								id="weight"
								placeholder="Enter weight"
								className="w-full border rounded border-gray-300 focus:border-gray-500 focus:outline-none px-2 py-1.5 
                                text-[10px] mb-2 transition-colors [appearance:textfield] [&::-webkit-inner-spin-button]:m-0 
                                [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
								value={weight}
								onChange={(e) => setWeight(e.target.value)}
							/>
						</div>
						<div className="flex items-center gap-3">
							<button
								className={`bg-blue-500 rounded text-white cursor-pointer text-[10px] px-4 py-1 transition-all
                                    ${isVibrating ? "animate-bounce border-2 border-red-500" : "hover:bg-blue-600"}`}
								onClick={calculateBMI}
							>
								Calculate BMI
							</button>
							<button
								className="bg-red-500 text-white rounded cursor-pointer text-[10px] px-2 py-1 hover:bg-red-600 transition-colors"
								onClick={clearInputs}
							>
								Clear
							</button>
						</div>
						{result && (
							<div className="my-2 border border-blue-300 p-2 rounded-xs">
								<p className="text-xs font-semibold text-blue-500">
									Your BMI is: {bmi}
								</p>
								<p className="text-[10px] text-gray-500">
									Status: {category}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BmiCalculator;

/*



    <div className="flex items-center gap-3">
        <button
            className={`bg-blue-500 rounded text-white cursor-pointer text-[12px] px-4 py-2 transition-all
            ${isVibrating ? "animate-bounce border-2 border-red-500" : "hover:bg-blue-600"}`}
            onClick={calculateBMI}
        >
            Calculate BMI
        </button>
        <button onClick={clearInputs} className="text-[12px] text-gray-400 underline">
            Reset
        </button>
    </div>
*/
