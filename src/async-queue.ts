import { checkEqual, loops, promiseWithResolvers } from './util';
import { concurrency } from './util';
import { queue } from 'async';

export default async function () {
	const aQueue = queue(async (task: () => Promise<any>) => await task(), concurrency);
	let j = 0;
	const { promise, resolve } = promiseWithResolvers();
	for (let i = 0; i < loops; i++) {
		aQueue.push(async () => ++j === loops && resolve());
	}
	await promise;
	checkEqual(j, loops);
	return new Response(String(j));
}
