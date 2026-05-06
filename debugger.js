import fs from "fs";

var levelAcc = 0;
const history = [];
const inMoments = new Map(); // Save the initial timestamp at each level

export function debug(sentido, ...args) {
	const level = getLevelAcc();
	const actualTime = performance.now();
	const prefix = "  ".repeat(getLevelAcc());

	if (sentido === "->") {
		inMoments.set(level, actualTime);
		console.log(
			`${prefix}-> Entering in level ${level} with args: `,
			...args,
		);
	} else {
		console.log(
			`${prefix}<- Exiting at level ${level} with args: `,
			...args,
		);

		const initialTime = inMoments.get(level);
		const stackLine = new Error().stack
			.split("\n")[2]
			.trim()
			.replace("at ", "")
			.split(" ");
		const pathParts = stackLine[1].split("/");
		const onlyFileAndLine = pathParts[pathParts.length - 1];

		const stackCleaned = stackLine[0] + " at " + onlyFileAndLine;

		history.push({
			level,
			result: args[0],
			startedAt: initialTime,
			finishedAt: actualTime,
			duration: actualTime - initialTime,
			stack: stackCleaned,
		});
		inMoments.delete(level);
	}
}

export function setLevelAcc(nivel) {
	levelAcc = nivel;
}

export function getLevelAcc() {
	return levelAcc;
}

export function increasedLevelAcc() {
	levelAcc++;
}

export function decreasedLevelAcc() {
	if (levelAcc > 0) {
		levelAcc--;
	}
}

export function resetlevelAcc() {
	levelAcc = 0;
}

export function getHistory() {
	return history;
}

export function saveReport() {
	console.log("\n--- 📊 Performance Report ---");

	let totalTime = 0;
	let slowestCall = { duration: 0 };

	history.forEach((entry) => {
		totalTime += entry.duration;
		if (entry.duration > slowestCall.duration) slowestCall = entry;
	});

	console.log(`Total Time: ${totalTime.toFixed(4)}ms`);
	console.log(
		`Slowest call: level ${slowestCall.level} with ${slowestCall.duration?.toFixed(4)}ms`,
	);

	try {
		const data = JSON.stringify(history, null, 2);
		fs.writeFileSync("history.json", data);
		console.log("💾 History saved to history.json");
	} catch (error) {
		console.error("❌ Error saving history file:", error);
	}
}
