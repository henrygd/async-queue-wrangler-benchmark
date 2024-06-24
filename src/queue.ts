import { checkEqual, loops, promiseWithResolvers } from './util';
import { concurrency } from './util';
import Queue from 'queue';

export default async function () {
	const q = new Queue({ results: [], concurrency, autostart: true });
	let j = 0;
	const { promise, resolve } = promiseWithResolvers();
	for (let i = 0; i < loops; i++) {
		q.push(async () => ++j === loops && resolve());
	}
	await promise;
	checkEqual(j, loops);
	return new Response(String(j));
}
