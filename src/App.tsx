import "./App.css";
import { useState } from "react";

function App() {
	const [answer, setAnswer] = useState("");
	const [expression, setExpression] = useState("");
	const et = expression.trim();

	const isOperator = (symbol: string) => {
		return /[*/+-]/.test(symbol);
	};

	const calculate = () => {
		if (isOperator(et.charAt(et.length - 1))) return;

		const parts = et.split(" ");
		const newParts = [];

		for (let i = parts.length - 1; i >= 0; i--) {
			if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
				newParts.unshift(parts[i]);
				let j = 0;
				let k = i - 1;
				while (isOperator(parts[k])) {
					k--;
					j++;
				}
				i -= j;
			} else {
				newParts.unshift(parts[i]);
			}
		}
		const newExpression = newParts.join(" ");
		if (isOperator(newExpression.charAt(0))) {
			setAnswer(eval(answer + newExpression) as string);
		} else {
			setAnswer(eval(newExpression) as string);
		}
		setExpression("");
	};

	const buttonPress = (symbol: string) => {
		if (symbol === "clear") {
			setAnswer("");
			setExpression("0");
		} else if (symbol === "negative") {
			if (answer === "") return;
			setAnswer(
				answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
			);
		} else if (symbol === "percent") {
			if (answer === "") return;
		} else if (isOperator(symbol)) {
			setExpression(et + " " + symbol + " ");
		} else if (symbol === "=") {
			calculate();
		} else if (symbol === "0") {
			if (expression.charAt(0) !== "0") {
				setExpression(expression + symbol);
			}
		} else if (symbol === ".") {
			const lastNumber = expression.split(/[-+/*/]/g).pop();
			if (lastNumber?.includes(".")) return;
			setExpression(expression + symbol);
		} else {
			if (expression.charAt(0) === "0") {
				setExpression(expression.slice(1) + symbol);
			} else {
				setExpression(expression + symbol);
			}
		}
	};
	return (
		<div className="container">
			<h1>My Calculator</h1>
			<div id="calculator">
				<div id="display" style={{ textAlign: "right" }}>
					<div id="answer">{answer}</div>
					<div id="expression">{expression}</div>
				</div>

				<button
					className="light-gray"
					id="clear"
					onClick={() => buttonPress("clear")}>
					C
				</button>
				<button
					className="light-gray"
					id="negative"
					onClick={() => buttonPress("negative ")}>
					+/-
				</button>
				<button
					className="light-gray"
					id="percentage"
					onClick={() => buttonPress("percentage")}>
					%
				</button>
				<button className="yellow" id="divide" onClick={() => buttonPress("/")}>
					/
				</button>
				<button
					className="dark-gray"
					id="seven"
					onClick={() => buttonPress("7")}>
					7
				</button>
				<button
					className="dark-gray"
					id="eight"
					onClick={() => buttonPress("8")}>
					8
				</button>
				<button
					className="dark-gray"
					id="nine"
					onClick={() => buttonPress("9")}>
					9
				</button>
				<button
					className="yellow"
					id="multiply"
					onClick={() => buttonPress("*")}>
					*
				</button>
				<button
					className="dark-gray"
					id="four"
					onClick={() => buttonPress("4")}>
					4
				</button>
				<button
					className="dark-gray"
					id="five"
					onClick={() => buttonPress("5")}>
					5
				</button>
				<button className="dark-gray" id="six" onClick={() => buttonPress("6")}>
					6
				</button>
				<button
					className="yellow"
					id="subtract"
					onClick={() => buttonPress("-")}>
					-
				</button>
				<button className="dark-gray" id="one" onClick={() => buttonPress("1")}>
					1
				</button>
				<button className="dark-gray" id="two" onClick={() => buttonPress("2")}>
					2
				</button>
				<button
					className="dark-gray"
					id="three"
					onClick={() => buttonPress("3")}>
					3
				</button>
				<button className="yellow" id="add" onClick={() => buttonPress("+")}>
					+
				</button>
				<button
					className="dark-gray"
					id="zero"
					onClick={() => buttonPress("0")}>
					0
				</button>
				<button
					className="dark-gray"
					id="decimal"
					onClick={() => buttonPress(".")}>
					.
				</button>
				<button className="yellow" id="equals" onClick={() => buttonPress("=")}>
					=
				</button>
			</div>
		</div>
	);
}

export default App;
