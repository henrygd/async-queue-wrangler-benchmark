import { checkEqual, loops } from './util';
import { concurrency } from './util';
import pLimit from 'p-limit';

export default {
	async fetch(): Promise<Response> {
		const limit = pLimit(concurrency);

		let i = 0;
		let j = 0;
		const jobs = [] as Promise<any>[];
		while (i < loops) {
			i++;
			jobs.push(limit(async () => j++));
		}
		await Promise.all(jobs);
		// make sure all promises resolved
		checkEqual(i, j);

		return new Response(j.toString());
	},
} satisfies ExportedHandler<Env>;
