import {
	debug,
	decreasedLevelAcc,
	saveReport,
	increasedLevelAcc,
} from "./debugger.js";

function fatorial(n) {
	increasedLevelAcc();
	debug("->", n);
	if (n <= 1) {
		debug("<-", 1);
		decreasedLevelAcc();
		return 1;
	}

	const result = n * fatorial(n - 1);

	debug("<-", result);
	decreasedLevelAcc();

	return result;
}

fatorial(5);
saveReport();
