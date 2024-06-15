/**
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 *
 * Benchmark:
 * oha --no-tui -n 100 http://localhost:8787/henrygd-queue > /dev/null && oha -n 500 http://localhost:8787/henrygd-queue
 */

const workers = {
	'henrygd-queue': () => import('./henrygd-queue'),
	'p-limit': () => import('./p-limit'),
	'promise-queue': () => import('./promise-queue'),
	'async-queue': () => import('./async-queue'),
	queue: () => import('./queue'),
	fastq: () => import('./fastq'),
} as Record<string, () => Promise<{ default: any }>>;

export default {
	async fetch(request): Promise<Response> {
		const path = request.url.split('/').at(-1) ?? '_';

		if (path in workers) {
			const { default: worker } = await workers[path]();
			return worker.fetch();
		}

		return new Response(`Unknown path: ${path}`, { status: 404 });
	},
} satisfies ExportedHandler<Env>;
