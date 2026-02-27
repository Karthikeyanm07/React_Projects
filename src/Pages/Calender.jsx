import { ArrowLeft, ArrowRight } from "lucide-react";
import "./App.css";
import { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const Calender = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const today = new Date(); // ✅ Create today ONCE, outside the render loop

	const daysInMonth = () => {
		const daysArray = [];

		const firstDay = new Date(
			selectedDate.getFullYear(),
			selectedDate.getMonth(),
			1,
		);

		const lastDay = new Date(
			selectedDate.getFullYear(),
			selectedDate.getMonth() + 1,
			0,
		);

		for (let i = 0; i < firstDay.getDay(); i++) {
			daysArray.push(null);
		}

		for (let i = 1; i <= lastDay.getDate(); i++) {
			daysArray.push(
				new Date(
					selectedDate.getFullYear(),
					selectedDate.getMonth(),
					i,
				),
			);
		}
		return daysArray;
	};

	const handleChangeMonth = (e) => {
		const newMonth = parseInt(e.target.value, 10);
		setSelectedDate(new Date(selectedDate.getFullYear(), newMonth, 1));
	};

	const handleChangeYear = (e) => {
		const newYear = parseInt(e.target.value, 10);
		setSelectedDate(new Date(newYear, selectedDate.getMonth(), 1));
	};

	// ✅ Compare two dates
	const isSameDay = (date1, date2) => {
		return (
			date1.getDate() === date2.getDate() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getFullYear() === date2.getFullYear()
		);
	};

	return (
		<div className="bg-indigo-500 min-h-screen w-full flex items-center justify-center">
			<div className="bg-slate-100 w-full max-w-lg p-4 rounded-lg mx-2">
				<div className="flex items-center justify-between p-2 mx-2 mb-4 border-b">
					<div className="flex items-center justify-center bg-blue-300 rounded-full p-2 hover:bg-blue-400 transition-all">
						<button
							className="cursor-pointer"
							onClick={() => {
								setSelectedDate(
									new Date(
										selectedDate.getFullYear(),
										selectedDate.getMonth() - 1,
										1,
									),
								);
							}}
						>
							<ArrowLeft />
						</button>
					</div>
					<div>
						<select
							value={selectedDate.getMonth()}
							onChange={handleChangeMonth}
							className="border px-2 py-1 rounded"
						>
							{months.map((month, index) => (
								<option key={index} value={index}>
									{month}
								</option>
							))}
						</select>
					</div>
					<div>
						<select
							value={selectedDate.getFullYear()}
							onChange={handleChangeYear}
							className="border px-2 py-1 rounded"
						>
							{Array.from(
								{ length: 30 },
								(_, i) => selectedDate.getFullYear() - 25 + i,
							).map((year) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</select>
					</div>
					<div className="flex items-center justify-center bg-blue-300 rounded-full p-2 hover:bg-blue-400 transition-all cursor-pointer">
						<button
							className="cursor-pointer"
							onClick={() => {
								setSelectedDate(
									new Date(
										selectedDate.getFullYear(),
										selectedDate.getMonth() + 1,
										1,
									),
								);
							}}
						>
							<ArrowRight />
						</button>
					</div>
				</div>

				<div className="grid grid-cols-7 text-center font-medium">
					{daysOfWeek.map((day) => (
						<div key={day}>{day}</div>
					))}
				</div>

				{/* ✅ FIXED CALENDAR GRID */}
				<div className="grid grid-cols-7 gap-2 text-center">
					{daysInMonth().map((day, index) => {
						// ✅ Calculate conditions OUTSIDE className
						const isToday = day && isSameDay(day, today);
						const isSelected = day && isSameDay(day, selectedDate);

						return (
							<div
								key={index}
								onClick={() => day && setSelectedDate(day)} // ✅ Click to select
								className={`
									px-1 py-3 cursor-pointer border transition-colors rounded
									${day ? "border-gray-300 hover:bg-blue-400 hover:text-white" : "border-transparent"}
									${isToday ? "bg-yellow-300 font-bold" : ""}
									${isSelected ? "bg-blue-500 text-white" : ""}
								`}
							>
								{day ? day.getDate() : ""}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Calender;
