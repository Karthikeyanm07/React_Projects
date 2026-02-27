import { Plus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Accordian = () => {
	const [openIndex, setOpenIndex] = useState(null);

	const faqs = [
		{
			question: "What is React?",
			answer: "React is a JavaScript library for building user interfaces, maintained by Meta.",
		},
		{
			question: "How do I use useState?",
			answer: "useState is a React Hook that lets you add state to functional components.",
		},
		{
			question: "What is Tailwind CSS?",
			answer: "Tailwind CSS is a utility-first CSS framework.",
		},
		{
			question: "How to deploy React apps?",
			answer: "You can deploy React apps using Vercel, Netlify, or GitHub Pages.",
		},
	];
	return (
		<div className="bg-cyan-700 min-h-screen w-full flex items-start p-10">
			<div className="w-full max-w-5xl mx-auto">
				<h1 className="text-2xl font-bold text-gray-300 mb-2">FAQs</h1>
				{faqs.map((faq, index) => (
					<FaqItems
						key={index}
						question={faq.question}
						answer={faq.answer}
						isOpen={openIndex === index}
						onToggle={() =>
							setOpenIndex(openIndex === index ? null : index)
						}
					/>
				))}
			</div>
		</div>
	);
};

const FaqItems = ({ question, answer, isOpen, onToggle }) => {
	//console.log(isOpen)
	return (
		<div className="m-4 border border-gray-200 rounded overflow-hidden">
			<div
				className="bg-gray-200 p-4 flex justify-between items-center cursor-pointer text-lg hover:bg-gray-300 transition-all group"
				onClick={onToggle}
			>
				{question}
				<motion.span
					animate={{ rotate: isOpen ? 45 : 0 }}
					transition={{ duration: 0.3 }}
				>
					<Plus className="group-hover:scale-110 transition-transform" />
				</motion.span>
			</div>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="bg-white overflow-hidden"
					>
						<div className="text-slate-600 p-4">{answer}</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
export default Accordian;
