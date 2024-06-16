import { checkEqual, loops } from './util';
import { concurrency } from './util';
import { newQueue } from '@henrygd/queue';

export default async function () {
	const queue = newQueue(concurrency);
	let i = 0;
	let j = 0;
	while (i < loops) {
		i++;
		queue.add(async () => j++);
	}
	await queue.done();
	// make sure all promises resolved
	checkEqual(i, j);

	return new Response(String(j));
}
