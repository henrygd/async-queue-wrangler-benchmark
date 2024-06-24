import { checkEqual, loops, promiseWithResolvers } from './util';
import { concurrency } from './util';
import { newQueue } from '@henrygd/queue';

export default async function () {
	const queue = newQueue(concurrency);
	let j = 0;
	const { promise, resolve } = promiseWithResolvers();
	for (let i = 0; i < loops; i++) {
		queue.add(async () => ++j === loops && resolve());
	}
	await promise;
	checkEqual(j, loops);
	return new Response(String(j));
}
