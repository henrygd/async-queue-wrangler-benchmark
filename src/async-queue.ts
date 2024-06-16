import { checkEqual, loops } from './util';
import { concurrency } from './util';
import { queue } from 'async';

export default async function () {
	const aQueue = queue(async (task: () => Promise<any>) => await task(), concurrency);
	let i = 0;
	let j = 0;
	while (i < loops) {
		i++;
		aQueue.push(async () => j++);
	}
	await aQueue.drain();
	// make sure all promises resolved
	checkEqual(i, j);

	return new Response(String(j));
}
