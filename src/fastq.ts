import { checkEqual, loops, promiseWithResolvers } from './util';
import { concurrency } from './util';
import fastq from 'fastq';

export default async function () {
	const fqQueue = fastq.promise((task) => task(), concurrency);
	let j = 0;
	const { promise, resolve } = promiseWithResolvers();
	for (let i = 0; i < loops; i++) {
		fqQueue.push(async () => ++j === loops && resolve());
	}
	await promise;
	checkEqual(j, loops);

	return new Response(String(j));
}
