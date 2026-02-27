import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const DigitalClock = () => {
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		console.log("I am useeffect");
		const time = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(time);
	}, []);

	// To convert Railway time to Normal time
	const formartHour = (hour) => {
		return hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
	};

	// To leading zero's 1 to 9
	const formatTimeWithLeadingZero = (num) => {
		return num < 10 ? `0${num}` : num;
	};

	const formateDate = (date) => {
		const options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		return date.toLocaleDateString(undefined, options);
	};
	return (
		<div className="bg-violet-400 min-h-screen flex justify-center items-center">
			<div className="bg-white w-full max-w-2xl mx-2 p-8 rounded-lg text-center">
				<h1 className="text-4xl font-bold text-orange-500">
					Digital Clock
				</h1>
				<h2 className="text-7xl m-4">
					{formatTimeWithLeadingZero(
						formartHour(currentTime.getHours()),
					)}{" "}
					: {formatTimeWithLeadingZero(currentTime.getMinutes())} :{" "}
					{formatTimeWithLeadingZero(currentTime.getSeconds())} {" "}
					{currentTime.getHours() >= 12 ? "PM" : "AM"}
				</h2>
				<p className="text-gray-600 text-xl">
					{formateDate(currentTime)}
				</p>
			</div>
		</div>
	);
};

export default DigitalClock;
