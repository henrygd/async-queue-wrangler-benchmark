import { checkEqual, loops } from './util';
import { concurrency } from './util';
import fastq from 'fastq';

export default {
	async fetch(): Promise<Response> {
		const fqQueue = fastq.promise(async (task) => await task(), concurrency);
		let i = 0;
		let j = 0;
		while (i < loops) {
			i++;
			fqQueue.push(async () => j++);
		}
		await fqQueue.drained();
		// make sure all promises resolved
		checkEqual(i, j);

		return new Response(String(j));
	},
} satisfies ExportedHandler<Env>;
