import {
	debug,
	decreasedLevelAcc,
	saveReport,
	increasedLevelAcc,
} from "./debugger.js";

function fatorial(n) {
	debug("->", n);
	if (n <= 1) {
		debug("<-", 1);
		return 1;
	}

	const result = n * fatorial(n - 1);

	debug("<-", result);

	return result;
}

fatorial(5);
saveReport();
