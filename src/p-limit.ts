import { checkEqual, loops, promiseWithResolvers } from './util';
import { concurrency } from './util';
import pLimit from 'p-limit';

export default async function () {
	const limit = pLimit(concurrency);
	let j = 0;
	const { promise, resolve } = promiseWithResolvers();
	for (let i = 0; i < loops; i++) {
		limit(async () => ++j === loops && resolve());
	}
	await promise;
	checkEqual(j, loops);
	return new Response(j.toString());
}
