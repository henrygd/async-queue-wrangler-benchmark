import { checkEqual, loops, promiseWithResolvers } from './util';
import { concurrency } from './util';
import pq from 'promise-queue/lib';

export default async function () {
	const promiseQueue = new pq(concurrency);
	let j = 0;
	const { promise, resolve } = promiseWithResolvers();
	for (let i = 0; i < loops; i++) {
		promiseQueue.add(async () => ++j === loops && resolve());
	}
	await promise;
	checkEqual(j, loops);
	return new Response(j.toString());
}
