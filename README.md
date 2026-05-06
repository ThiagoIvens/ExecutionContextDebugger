# Recursive Debugger & Performance Tracker 🚀

A lightweight and efficient utility for debugging recursive functions in JavaScript/Node.js. This tool transforms cluttered console logs into an organized visual tree, tracks execution time for every recursion depth, and generates automated performance reports.

## 📌 Motivation

Debugging recursive functions is often a headache: the console gets flooded, and it's hard to track which depth level caused an error or which branch is consuming the most resources. This project was built to:

- **Visualize** call hierarchy in real-time.
- **Identify** performance bottlenecks in complex algorithms.
- **Persist** execution data for post-mortem analysis.

## ✨ Key Features

- **Hierarchical Logging 🌳**: Automatic indentation based on recursion depth (`level`) for instant readability.
- **Performance Metrics ⏱️**: High-precision timing using `performance.now()` to measure the lifespan of each call.
- **Clean Stack Traces 📍**: Captures the exact call site (file and line) while stripping away absolute paths and system noise.
- **Data Persistence 📂**: Automatically exports the entire execution trace to a formatted `history.json` file.
- **Bottleneck Detection 🔥**: Calculates total execution time and highlights the slowest call in the cycle.

## 🚀 Usage

### 1. Import the utility:

```javascript
import { debug, printReport } from "./debugger.js";
```

### 2. Implement within your recursive function (example in main.example.js):

```javascript
function factorial(n) {
	debug("->", n); // Entry: logs arguments and increments level

	let result;
	if (n === 0) {
		result = 1;
	} else {
		result = n * factorial(n - 1);
	}

	debug("<-", result); // Exit: logs result, calculates duration, and saves to history
	return result;
}

factorial(5);
printReport(); // Generates summary and saves the JSON file
```

### 📊 Console Output Example

```
-> Entering in level 0 with args: 3
  -> Entering in level 1 with args: 2
    -> Entering in level 2 with args: 1
    <- Exiting at level 2 with args: 1
  <- Exiting at level 1 with args: 2
<- Exiting at level 0 with args: 6

--- 📊 Performance Report ---
Total Time: 0.4520ms
Slowest call: level 0 with 0.4520ms
💾 History saved to history.json
```

### 📁 JSON Schema (history.json)

The generated file provides a full audit trail for external analysis:

```json
[
	{
		"level": 2,
		"result": 1,
		"startedAt": 1245.5,
		"finishedAt": 1245.6,
		"duration": 0.1,
		"stack": "factorial at script.js:14"
	}
]
```


### 🛠️ Tech Stack
- JavaScript (ES6+)
- Node.js fs module (for data persistence)
- Performance API (for high-resolution metrics)

---
*Project developed for algorithmic study and software engineering excellence.*