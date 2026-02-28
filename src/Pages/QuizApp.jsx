import { useEffect, useState } from "react";
import { CheckCircle, Clock, RefreshCw, Trophy, XCircle } from "lucide-react";
import quizData from "./Quiz.json";

const QuizApp = () => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [timer, setTimer] = useState(10);
	const [failedQuestions, setFailedQuestions] = useState([]);
	const [quizSet, setQuizSet] = useState(1);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [isAnswered, setIsAnswered] = useState(false);

	// ✅ Get questions based on selected set
	const getQuestions = () => {
		if (quizSet === 1) {
			return quizData.slice(0, 10); // First 10 questions
		} else {
			return quizData.slice(10, 20); // Last 10 questions
		}
	};

	const questions = getQuestions();

	const handleAnswerClick = (selectedOptionIndex) => {
		if (isAnswered) return; // Prevent multiple clicks

		setSelectedAnswer(selectedOptionIndex);
		setIsAnswered(true);

		const currentQ = questions[currentQuestion];

		// ✅ Check if answer is correct
		if (selectedOptionIndex === currentQ.correctOption) {
			setScore((prev) => prev + 1);
		} else {
			// Store failed questions corrrectly
			const failedQ = {
				qNo: currentQ.id,
				question: currentQ.question,
				correctAnswer: currentQ.options[currentQ.correctOption],
				userAnswer: currentQ.options[selectedOptionIndex],
			};
			setFailedQuestions((prev) => [...prev, failedQ]); // Add to array
		}

		setTimeout(() => {
			if (currentQuestion < questions.length - 1) {
				setCurrentQuestion((prev) => prev + 1);
				setTimer(10);
				setSelectedAnswer(null);
				setIsAnswered(false);
			} else {
				setShowScore(true);
			}
		}, 1500);
	};

	// Reset quiz
	const resetQuiz = () => {
		setCurrentQuestion(0);
		setScore(0);
		setTimer(10);
		setShowScore(false);
		setFailedQuestions([]);
		setSelectedAnswer(null);
		setIsAnswered(false);
	};

	// ✅ Change quiz set
	const changeQuizSet = (set) => {
		setQuizSet(set);
		resetQuiz();
	};

	//Timer effect
	useEffect(() => {
		let interval;

		if (timer > 0 && !showScore && !isAnswered) {
			interval = setInterval(() => {
				setTimer((prevTimer) => prevTimer - 1);
			}, 1000);
		} else if (timer === 0 && !showScore) {
			// Time's up = mark as failed
			const currentQ = questions[currentQuestion];
			const failedQ = {
				qNo: currentQ.id,
				question: currentQ.question,
				correctAnswer: currentQ.options[currentQ.correctOption],
				userAnswer: "No answer (Time expired)",
			};

			setFailedQuestions((prev) => [...prev, failedQ]);

			// Move to next QN
			if (currentQuestion < questions.length - 1) {
				setCurrentQuestion((prev) => prev + 1);
				setTimer(10);
			} else {
				setShowScore(true);
			}
		}

		return () => clearInterval(interval);
	}, [timer, showScore, isAnswered, currentQuestion, questions]);

	return (
		<div className="flex items-center justify-center p-4 w-full min-h-screen bg-gradient-to-br from-purple-500 via-pink-500">
			<div className="bg-white w-full max-w-3xl shadow-2xl rounded-2xl overflow-hidden">
				{/* Quiz Set selector */}
				{!showScore && (
					<div className="bg-gradient-to-r from-purple-600 to-pink-600 flex justify-center gap-4 p-4">
						<button
							onClick={() => changeQuizSet(1)}
							className={`
                                px-6 py-2 rounded-lg font-semibold transition-all cursor-pointer
                                ${
									quizSet === 1
										? "bg-white text-purple-600 scale-105"
										: "bg-purple-700 text-white hover:bg-purple-800"
								}`}
						>
							Question 1 - 10
						</button>
						<button
							onClick={() => changeQuizSet(2)}
							className={`
                                px-6 py-2 rounded-lg font-semibold transition-all cursor-pointer 
                                ${
									quizSet === 2
										? "bg-white text-purple-600 scale-105"
										: "bg-purple-700 text-white hover:bg-purple-800"
								}`}
						>
							Question 11 - 20
						</button>
					</div>
				)}

				{/*  */}
				{showScore ? (
					<div className="p-8">
						<div className="text-center mb-8">
							<Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
							<h1 className="font-bold text-4xl mb-2">
								Quiz Complete
							</h1>
							<p className="text-2xl text-gray-600">
								Your Score:{" "}
								<span className="font-bold text-purple-600">
									{score}
								</span>{" "}
								/ {questions.length}
							</p>
							<p className="text-lg text-gray-500 mt-2">
								{score === questions.length
									? "Perfect! 🎉"
									: score >= questions.length * 0.7
										? "Great job! 👏"
										: score >= questions.length * 0.5
											? "Good effort! 💪"
											: "Keep practicing! 📚"}
							</p>
						</div>
						{/* Failed questions display */}
						{failedQuestions.length > 0 && (
							<div className="mb-6">
								<h2 className="text-2xl font-bold mb-4 text-red-600 flex items-center gap-2">
									<XCircle className="w-6 h-6" />
									Questions You Missed ({failedQuestions.length})
								</h2>
								<div className="space-y-4 max-h-96 overflow-y-auto">
									{failedQuestions.map((failed, index) => (
										<div
											key={index}
											className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg"
										>
											<p className="font-semibold text-gray-800 mb-2">
												Q{failed.qNo}: {failed.question}
											</p>
											<div className="grid grid-cols-1 gap-2 text-sm">
												<div className="flex items-center gap-2">
													<XCircle className="w-4 h-4 text-red-500" />
													<span className="text-red-600">
														Your answer:{" "}
														<strong>
															{failed.userAnswer}
														</strong>
													</span>
												</div>
												<div className="flex items-center gap-2">
													<CheckCircle className="w-4 h-4 text-green-500" />
													<span className="text-green-600">
														Correct answer:{" "}
														<strong>
															{
																failed.correctAnswer
															}
														</strong>
													</span>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Buttons */}
						<div className="flex gap-4 justify-center">
							<button
								className="
                                flex items-center gap-2 text-white px-6 py-3 hover:bg-purple-700 
                                transition-colors rounded-lg bg-purple-600 font-semibold"
								onClick={resetQuiz}
							>
								<RefreshCw className="w-5 h-5" />
								Retry Quiz {quizSet}
							</button>
							<button
								onClick={() =>
									changeQuizSet(quizSet === 1 ? 2 : 1)
								}
								className="
                                flex items-center gap-2 text-white px-6 py-3 
                                hover:bg-pink-700 transition-colors rounded-lg bg-pink-600 font-semibold"
							>
								Try Quiz {quizSet === 1 ? 2 : 1}
							</button>
						</div>
					</div>
				) : (
					<div className="p-8">
						<div className="mb-6">
							<div className="flex justify-between text-sm text-gray-600 mb-2">
								<span>
									Question {currentQuestion + 1} of{" "}
									{questions.length}
								</span>
								<span>Score: {score}</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div
									className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full duration-300"
									style={{
										width: `${((currentQuestion + 1) / questions.length) * 100}%`,
									}}
								/>
							</div>
						</div>
						{/* Questions */}
						<div className="mb-8">
							<h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
								{questions[currentQuestion].question}
							</h2>
							{/* options */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{questions[currentQuestion].options.map(
									(option, index) => {
										const isCorrect =
											index ===
											questions[currentQuestion]
												.correctOption;
										const isSelected =
											selectedAnswer === index;
										const showResult = isAnswered;

										return (
											<button
												onClick={() =>
													handleAnswerClick(index)
												}
												key={index}
												disabled={isAnswered}
												className={`
                                                p-4 rounded-lg font-medium text-left transition-all transform hover:scale-105
                                                ${!showResult ? "bg-gray-100 hover:bg-purple-100 border-2 border-gray-300" : ""}
                                                ${showResult && isSelected && isCorrect ? "bg-green-500 text-white border-2 border-green-600" : ""}
                                                ${showResult && isSelected && !isCorrect ? "bg-red-500 text-white border-2 border-red-600" : ""}
                                                ${showResult && !isSelected && isCorrect ? "bg-green-100 border-2 border-green-500" : ""}
                                                ${showResult && !isSelected && !isCorrect ? "bg-gray-100 border-2 border-gray-300 opacity-50" : ""}
                                                ${isAnswered ? "cursor-not-allowed" : "cursor-pointer"}
                                                `}
											>
												{option}
											</button>
										);
									},
								)}
							</div>
						</div>
						{/* Timer */}
						<div className="flex items-center justify-center gap-2">
							<Clock
								className={`w-6 h-6 ${timer <= 3 ? "text-red-500 animate-pulse" : "text-purple-600"}`}
							/>
							<span
								className={`text-xl font-bold ${timer <= 3 ? "text-red-500" : "text-purple-600"}`}
							>
								{timer}s
							</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default QuizApp;
