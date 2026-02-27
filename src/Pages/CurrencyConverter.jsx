import { ArrowLeftRight, PiggyBank, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

// ─── Currencies list (shared between both dropdowns) ────────────────────────
const CURRENCIES = [
	{ code: "USD", name: "United States Dollar", flag: "🇺🇸" },
	{ code: "EUR", name: "Euro", flag: "🇪🇺" },
	{ code: "GBP", name: "British Pound", flag: "🇬🇧" },
	{ code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
	{ code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
	{ code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
	{ code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
	{ code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
	{ code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
	{ code: "SGD", name: "Singapore Dollar", flag: "🇸🇬" },
];

const CurrencySelector = ({ id, name, value, onChange }) => {
	return (
		<div className="relative">
			<select
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				className="
                w-full px-4 py-3 pr-10
                bg-slate-800 text-white
                border border-slate-600 rounded-xl
                focus:outline-none focus:border-emerald-500
                transition-colors duration-200
                appearance-none cursor-pointer"
			>
				<option value="">Select currency</option>
				{CURRENCIES.map((c) => (
					<option key={c.code} value={c.code}>
						{c.flag} {c.code} - {c.name}
					</option>
				))}
			</select>

			<div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				>
					<polyline points="6 9 12 15 18 9" />
				</svg>
			</div>
		</div>
	);
};

// ─── Main Component ──────────────────────────────────────────────────────────
const CurrencyConverter = () => {
	const [amount, setAmount] = useState("1");
	const [from, setFrom] = useState("USD");
	const [to, setTo] = useState("INR");
	const [rate, setRate] = useState(0);
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);

	const apiKey = "33f3ea8588a44a9f63fd3cea";

	const handleConvert = async () => {
		if (!amount || !from || !to) return;

		setLoading(true);

		const URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;

		try {
			let response = await axios.get(URL);
			const fetchedRate = response.data.conversion_rates[to];
			setRate(fetchedRate);

			// Calculate result immediately with the fetched rate
			const convertedAmount = (parseFloat(amount) * fetchedRate).toFixed(
				2,
			);
			setResult(convertedAmount);
		} catch (error) {
			console.log("Error fetching exchange rate: ", error);
		}
        finally {
            setLoading(false);
        }
	};

	useEffect(() => {
		if (amount) {
			handleConvert();
		}
	}, [from, to, amount]); // Re-fetch when currencies change

	const handleSwap = () => {
		setFrom(to);
		setTo(from);
		setResult(null);
	};

	return (
		<>
			<style>{`
				.no-spin::-webkit-inner-spin-button,
				.no-spin::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
				.no-spin { -moz-appearance: textfield; }
			`}</style>

			<div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
				<div
					className="
                    grid grid-cols-1 md:grid-cols-[1fr_1.2fr]
                    w-full max-w-2xl rounded-2xl overflow-hidden
                    shadow-[0_0_60px_rgba(16,185,129,0.1)]
                    border border-slate-800"
				>
					{/* Left panel */}
					<div
						className="
                        hidden md:flex flex-col items-center justify-between 
                        bg-gradient-to-b from-emerald-950 to-slate-900
                        p-8 border-r border-slate-800"
					>
						<div className="text-center">
							<div
								className="
                                w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30
                                flex items-center justify-center mx-auto mb-4"
							>
								<TrendingUp className="w-7 h-7 text-emerald-400 stroke-2" />
							</div>
							<p className="text-emerald-400 text-sm font-semibold tracking-widest">
								FX CONVERT
							</p>
							<p className="text-slate-500 text-xs mt-1">
								Real-time rates
							</p>
						</div>

						<div className="flex flex-col gap-3 w-full">
							{["INR", "USD", "EUR", "JPY", "GBP"].map((code) => (
								<div
									key={code}
									className="
                                        flex items-center justify-between  px-3 py-2 rounded-lg bg-slate-800/50
                                        border border-slate-700/50 text-slate-400 text-xs"
								>
									<span>
										{
											CURRENCIES.find(
												(c) => c.code === code,
											)?.flag
										}{" "}
										{code}
									</span>
									<span className="text-emerald-500 font-mono text-[10px]">
										LIVE
									</span>
								</div>
							))}
						</div>
						<p className="text-slate-700 text-center text-[10px] mt-2">
							Rates updated every minutes
						</p>
					</div>

					{/* Right panel */}
					<div className="bg-slate-900 p-8">
						<div className="flex items-start justify-between mb-8">
							<div>
								<h1 className="text-white text-2xl font-bold">
									Convert
								</h1>
								<p className="text-slate-500 text-sm mt-0.5">
									Currency exchnage made simple
								</p>
							</div>
							<div
								className="
                                w-9 h-9 flex items-center justify-center rounded-xl
                                bg-emerald-500/10 border border-emerald-500/20"
							>
								<ArrowLeftRight className="text-emerald-400 w-4 h-4 stroke-2" />
							</div>
						</div>
						<div className="mb-5">
							<label
								htmlFor="amount"
								className="
                                text-slate-400 text-xs font-semibold
                                uppercase tracking-wider mb-2 block"
							>
								Amount
							</label>
							<div
								className="
                                flex items-stretch rounded-xl overflow-hidden border 
                                border-slate-700 focus-within:border-emerald-500 transition-colors"
							>
								<span
									className="
                                    flex items-center justify-center px-4
                                    bg-slate-800 text-slate-400 text-sm
                                    border-r border-slate-700 select-none"
								>
									<PiggyBank />
								</span>
								<input
									type="number"
									id="amount"
									value={amount}
									placeholder="0.00"
									className="
                                        no-spin flex-1 bg-slate-900 text-white 
                                        px-4 py-3 text-lg placeholder-slate-600 focus:outline-none"
									onChange={(e) => setAmount(e.target.value)}
								/>
							</div>
						</div>
						<div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3 mb-5">
							<div>
								<label
									htmlFor="from"
									className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2 block"
								>
									From
								</label>
								<CurrencySelector
									id="from"
									name="from"
									value={from}
									onChange={(e) => setFrom(e.target.value)}
								/>
							</div>

							<button
								onClick={handleSwap}
								className="
                                w-10 h-10 flex items-center justify-center
                                rounded-xl bg-slate-800 border border-slate-700
                                hover:border-emerald-500 hover:bg-emerald-500/10
                                text-slate-400 hover:text-emerald-400
                                transition-all duration-200 group"
							>
								<ArrowLeftRight className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
							</button>

							<div>
								<label
									htmlFor="to"
									className="
                                text-slate-400 text-xs font-semibold
                                uppercase tracking-wider mb-2 block"
								>
									To
								</label>
								<CurrencySelector
									id="to"
									name="to"
									value={to}
									onChange={(e) => setTo(e.target.value)}
								/>
							</div>
						</div>

						{/* convertor button
						<button
							className="
                            w-full py-3.5 rounded-xl font-semibold text-sm
                            bg-emerald-500 hover:bg-emerald-400
                            disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed
                            text-slate-900 transition-all duration-200
                            active:scale-[0.98]"
							onClick={handleConvert}
						>
							Convert now
						</button> */}

						{/* Result */}

						{loading && (
							<div className="mt-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 text-center">
								<p className="text-slate-500 text-sm">
									Converting...
								</p>
							</div>
						)}
						{result && !loading && (
							<div className="mt-4 p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40">
								<p className="text-slate-500 text-xs mb-1">
									Result
								</p>
								<div className="flex items-baseline justify-between">
									<span className="text-3xl font-bold text-emerald-400 font-mono">
										{result}
									</span>
									<span className="text-slate-400 text-sm pt-2.5">
										{to}
									</span>
								</div>
								<p className="text-slate-500 text-xs mt-2">
									{amount} {from} = {result} {to} · Rate:{" "}
									{rate.toFixed(4)}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default CurrencyConverter;
