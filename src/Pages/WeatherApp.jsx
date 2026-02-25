import { useEffect, useState } from "react";
import "./App.css";
import {
	Sun,
	Cloud,
	CloudRain,
	CloudSnow,
	CloudLightning,
	CloudDrizzle,
	CloudFog,
	Search,
	Droplets,
	Wind,
	MapPin,
	Moon,
	CloudMoon,
	SunMedium,
} from "lucide-react";

const WeatherApp = () => {
	const [icon, setIcon] = useState();
	const [temperature, setTemperature] = useState(0);
	const [city, setCity] = useState("Chennai");
	const [country, setCountry] = useState("India");
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);
	const [humidity, setHumidity] = useState(0);
	const [windSpeed, setWindSpeed] = useState(0);
	const [weatherDesc, setWeatherDesc] = useState("");
	const [searchInput, setSearchInput] = useState("Chennai");
	const [cityNotFound, setCityNotFound] = useState(false);
	const [loading, setLoading] = useState(false);

	const weatherIconMap = {
		// Clear sky
		"01d": <Sun className="w-24 h-24 text-amber-400 drop-shadow-lg" strokeWidth={1.5} />,
		"01n": <Moon className="w-24 h-24 text-indigo-300 drop-shadow-lg" strokeWidth={1.5} />,
		// Few clouds
		"02d": <SunMedium className="w-24 h-24 text-amber-400 drop-shadow-lg" strokeWidth={1.5} />,
		"02n": <CloudMoon className="w-24 h-24 text-indigo-300 drop-shadow-lg" strokeWidth={1.5} />,
		// Scattered clouds
		"03d": <Cloud className="w-24 h-24 text-slate-400 drop-shadow-lg" strokeWidth={1.5} />,
		"03n": <Cloud className="w-24 h-24 text-slate-500 drop-shadow-lg" strokeWidth={1.5} />,
		// Broken clouds
		"04d": <Cloud className="w-24 h-24 text-slate-500 drop-shadow-lg" strokeWidth={1.5} />,
		"04n": <Cloud className="w-24 h-24 text-slate-600 drop-shadow-lg" strokeWidth={1.5} />,
		// Shower rain
		"09d": <CloudDrizzle className="w-24 h-24 text-blue-400 drop-shadow-lg" strokeWidth={1.5} />,
		"09n": <CloudDrizzle className="w-24 h-24 text-blue-500 drop-shadow-lg" strokeWidth={1.5} />,
		// Rain
		"10d": <CloudRain className="w-24 h-24 text-blue-500 drop-shadow-lg" strokeWidth={1.5} />,
		"10n": <CloudRain className="w-24 h-24 text-blue-600 drop-shadow-lg" strokeWidth={1.5} />,
		// Thunderstorm
		"11d": <CloudLightning className="w-24 h-24 text-yellow-500 drop-shadow-lg" strokeWidth={1.5} />,
		"11n": <CloudLightning className="w-24 h-24 text-yellow-400 drop-shadow-lg" strokeWidth={1.5} />,
		// Snow
		"13d": <CloudSnow className="w-24 h-24 text-sky-300 drop-shadow-lg" strokeWidth={1.5} />,
		"13n": <CloudSnow className="w-24 h-24 text-sky-400 drop-shadow-lg" strokeWidth={1.5} />,
		// Mist / Fog
		"50d": <CloudFog className="w-24 h-24 text-gray-400 drop-shadow-lg" strokeWidth={1.5} />,
		"50n": <CloudFog className="w-24 h-24 text-gray-500 drop-shadow-lg" strokeWidth={1.5} />,
	};

	let apiKey = "85e4f75f0da001e4a9bcd3b1b3183f96";

	const handleCity = (e) => {
		setSearchInput(e.target.value);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			search();
		}
	};

	const search = async () => {
		setLoading(true);
		const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=Metric`;

		try {
			const response = await fetch(apiURL);
			const data = await response.json();

			if (data.cod !== 200) {
				console.error("City not found");
				setCityNotFound(true);
				setLoading(false);
				return;
			}

            console.log(data);

			setTemperature(Math.floor(data.main.temp));
			setCity(data.name);
			setCountry(data.sys.country);
			setLatitude(data.coord.lat);
			setLongitude(data.coord.lon);
			setHumidity(data.main.humidity);
			setWindSpeed(data.wind.speed);
			setWeatherDesc(data.weather[0].description);

			const weatherIconCode = data.weather[0].icon;
			setIcon(weatherIconMap[weatherIconCode]);

			setCityNotFound(false);
		} catch (error) {
			console.log(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		search();
	}, []);

	return (
		<div className="min-h-screen flex justify-center items-center w-full bg-linear-to-br from-slate-900 via-blue-950 to-slate-900">
			{/* Decorative background circles */}
			<div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute bottom-20 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

			<div className="relative z-10 w-full max-w-sm mx-4">
				{/* Card */}
				<div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
					{/* Header */}
					<div className="px-6 pt-6 pb-4">
						<h2 className="text-center text-white/50 text-xs font-semibold tracking-widest uppercase mb-4">
							Weather App
						</h2>

						{/* Search */}
						<div className="relative group">
							<input
								type="text"
								placeholder="Search city..."
								className="w-full bg-white/10 border border-white/15 rounded-xl pl-4 pr-10 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-400/60 focus:bg-white/15 transition-all duration-200"
								onChange={handleCity}
								onKeyDown={handleKeyDown}
								defaultValue="Chennai"
							/>
							<button
								onClick={() => search()}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
							>
								<Search className="w-4 h-4" />
							</button>
						</div>
					</div>

					{/* Weather Content */}
					{loading ? (
						<div className="flex justify-center items-center h-64">
							<div className="w-8 h-8 border-2 border-blue-400/40 border-t-blue-400 rounded-full animate-spin" />
						</div>
					) : cityNotFound ? (
						<div className="flex flex-col justify-center items-center h-64 text-white/50 gap-2">
							<Search className="w-10 h-10 opacity-40" />
							<p className="text-sm">City not found</p>
						</div>
					) : (
						<>
							{/* Icon & Temp */}
							<div className="px-6 py-4 flex flex-col items-center">
								<div className="mb-2 drop-shadow-2xl">
									{icon || <Sun className="w-24 h-24 text-amber-400" strokeWidth={1.5} />}
								</div>
								<p className="text-white/50 text-sm capitalize mb-1">{weatherDesc}</p>
								<div className="text-white text-7xl font-thin tracking-tighter">
									{temperature}
									<span className="text-3xl align-top mt-3 inline-block text-white/60">°C</span>
								</div>
							</div>

							{/* City */}
							<div className="text-center px-6 pb-4">
								<div className="flex items-center justify-center gap-1.5 text-white">
									<MapPin className="w-4 h-4 text-blue-400" strokeWidth={2} />
									<span className="text-xl font-semibold tracking-wide">{city}</span>
									<span className="text-sm text-white/50 font-normal mt-0.5">{country}</span>
								</div>
								<div className="flex justify-center gap-4 mt-2 text-white/40 text-xs">
									<span>Lat: {latitude}°</span>
									<span>Lon: {longitude}°</span>
								</div>
							</div>

							{/* Divider */}
							<div className="mx-6 border-t border-white/10" />

							{/* Stats */}
							<div className="px-6 py-5 flex justify-around">
								<div className="flex flex-col items-center gap-2">
									<div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
										<Droplets className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
									</div>
									<div className="text-center">
										<div className="text-white font-semibold text-lg leading-none">
											{humidity}%
										</div>
										<div className="text-white/40 text-xs mt-1">Humidity</div>
									</div>
								</div>

								<div className="w-px bg-white/10" />

								<div className="flex flex-col items-center gap-2">
									<div className="w-10 h-10 rounded-xl bg-teal-500/15 flex items-center justify-center">
										<Wind className="w-5 h-5 text-teal-400" strokeWidth={1.5} />
									</div>
									<div className="text-center">
										<div className="text-white font-semibold text-lg leading-none">
											{windSpeed}
										</div>
										<div className="text-white/40 text-xs mt-1">km/hr</div>
									</div>
								</div>
							</div>
						</>
					)}

					{/* Footer */}
					<div className="px-6 pb-5 text-center text-white/20 text-xs">
						Designed & Developed by <span className="font-semibold italic text-white/35">@MJK</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WeatherApp;

// import { useEffect, useState } from "react";
// import "./App.css";
// import { Droplets, Search, Sun, Wind } from "lucide-react";

// const App = () => {

// 	const [icon, setIcon] = useState();
// 	const [temperature, setTemperature] = useState(0);
// 	const [city, setCity] = useState("Chennai");
// 	const [country, setCountry] = useState("Inida");
// 	const [latitude, setLatitude] = useState(0);
// 	const [longitude, setLongitude] = useState(0);
// 	const [humidity, setHumidity] = useState(0);
// 	const [windSpeed, setWindSpeed] = useState(0);

//     // Get data from Input box
//     const [searchInput, setSearchInput] = useState("Chennai");

//     // Maintain loading and city not found state
//     const [cityNotFound, setCityNotFound] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const weatherIconMap = {
//         "01d": <Sun className="w-35 h-35 p-2 text-yellow-500/80"/> ,
//         "01n": "",
//         "02d": "",
//         "02n": "",
//         "03d": "",
//         "03n": "",
//         "04d": "",
//         "04n": "",
//         "09d": "",
//         "09n": "",
//         "10d": "",
//         "10n": "",
//         "13d": "",
//         "13n": "",
//     }

// 	let apiKey = "85e4f75f0da001e4a9bcd3b1b3183f96";

// 	const handleCity = (e) => {
//         setSearchInput(e.target.value);
//     };

// 	const handleKeyDown = (e) => {
// 		if (e.key == "Enter") {
// 			search();
// 		}
// 	};

//     // Fetching
// 	const search = async () => {
// 		setLoading(true);

// 		const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=Metric`;

// 		try{
// 			const response = await fetch(apiURL);
// 			const data = await response.json();
			
// 			if (data.cod !== 200){
// 				console.error("City not found");
// 				setCityNotFound(true);
// 				return;
// 			}
// 			console.log(data);

// 			setTemperature(Math.floor(data.main.temp));
// 			setCity(data.name);
// 			setCountry(data.sys.country);
// 			setLatitude(data.coord.lat);
// 			setLongitude(data.coord.lon);
// 			setHumidity(data.main.humidity);
// 			setWindSpeed(data.wind.speed);

//             // Change image or icon based on API weather code
//             const weatherIconCode = data.weather[0].icon;
//             setIcon(weatherIconMap[weatherIconCode]);

//             setCityNotFound(false);
// 		}
// 		catch (error){
// 			console.log(error.message);
// 		}
// 		finally{
// 			setLoading(false);
// 		}
// 	};

//     useEffect(() => {
//         search();
//     },[])

// 	return (
// 		<div className="bg-slate-700 min-h-screen flex justify-center items-center w-full">
// 			<div className="bg-white rounded shadow-xl p-5 w-md">
// 				<h2 className="text-center font-semibold mb-4">Weather App</h2>
// 				<div className="relative group">
// 					<Search
// 						className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors pointer-events-none"
// 						onClick={() => search()}
// 					/>
// 					<input
// 						type="text"
// 						placeholder="Search city..."
// 						className="w-full pl-10 pr-4 py-2.5 border-2 border-blue-300 focus:border-blue-500 rounded-lg text-sm focus:outline-none transition-all duration-200"
// 						onChange={handleCity}
// 						onKeyDown={handleKeyDown}
// 					/>
// 				</div>
// 				<WeatherDetails
// 					icon={icon}
// 					temp={temperature}
// 					city={city}
// 					country={country}
// 					lat={latitude}
// 					log={longitude}
// 					humidity={humidity}
// 					wind={windSpeed}
// 				/>
// 				<p className="text-center mt-4 text-sm text-gray-500">
// 					Desinged & Developed by{" "}
// 					<span className="font-semibold italic">@MJK</span>
// 				</p>
// 			</div>
// 		</div>
// 	);
// };

// export default App;

// const WeatherDetails = (props) => {
// 	const { icon, temp, city, country, lat, log, humidity, wind } = props;
// 	return (
// 		<>
// 			<div className="flex items-center justify-center h-[150px] mb-[10px]">
// 				{icon}
// 			</div>
// 			<div className="mt-2 text-4xl font-bold text-center ">{temp}°C</div>
// 			<div className="mt-1 text-xl text-center font-semibold uppercase">
// 				{city}
// 			</div>
// 			<div className="mt-1 text-sm text-center uppercase">{country}</div>
// 			<div className="flex justify-center items-center gap-2 text-center mt-2">
// 				<div className="flex flex-col justify-center items-center p-2">
// 					<span className="text-xl">latitude</span>
// 					<span className="font-semibold text-2xl text-gray-600">
// 						{lat}
// 					</span>
// 				</div>
// 				<div className="flex flex-col justify-center items-center p-2">
// 					<span className="text-xl">longitude</span>
// 					<span className="font-semibold text-2xl text-gray-600">
// 						{log}
// 					</span>
// 				</div>
// 			</div>
// 			<div className="flex justify-between items-center mt-4 px-4">
// 				<div className="flex flex-col justify-center items-center text-center">
// 					<Droplets className={`w-10 h-10 mb-2 stroke-1`} />
// 					<div>
// 						<div className="font-bold text-xl">
// 							{humidity}
// 							<span className="text-sm font-bold"> %</span>
// 						</div>
// 						<div className="text-sm text-gray-500">Humidity</div>
// 					</div>
// 				</div>
// 				<div className="flex flex-col justify-center items-center text-center">
// 					<Wind className={`w-10 h-10 mb-2 stroke-1`} />
// 					<div>
// 						<div className="font-bold text-xl">
// 							{wind}
// 							<span className="text-sm font-bold"> km/hr</span>
// 						</div>
// 						<div className="text-sm text-gray-500">Wind speed</div>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// // const SearchInput = ({ placeholder = "Search..." }) => {
// // 	return (
// // 		<div className="relative group">
// // 			<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
// // 			<input
// // 				type="text"
// // 				placeholder={placeholder}
// // 				className="w-full pl-10 pr-4 py-2.5 border-2 border-blue-300 focus:border-blue-500 rounded-lg text-sm focus:outline-none transition-all duration-200"
// // 			/>
// // 		</div>
// // 	);
// // };
