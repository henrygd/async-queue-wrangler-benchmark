import { checkEqual, loops } from './util';
import { concurrency } from './util';
import Queue from 'queue';

export default {
	async fetch(): Promise<Response> {
		const q = new Queue({ results: [], concurrency });
		let i = 0;
		let j = 0;
		while (i < loops) {
			i++;
			q.push(async () => j++);
		}
		await q.start();
		// make sure all promises resolved
		checkEqual(i, j);

		return new Response(String(j));
	},
} satisfies ExportedHandler<Env>;
