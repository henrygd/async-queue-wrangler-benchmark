/**
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 *
 * Benchmark:
 * oha --no-tui -n 100 http://localhost:8787/henrygd-queue > /dev/null && oha -n 1000 http://localhost:8787/henrygd-queue
 *
 * A queue is created to handle each request, so this tests creation time as well as throughput.
 */

import hgdWorker from './henrygd-queue';
import pLimitWorker from './p-limit';
import promiseQueueWorker from './promise-queue';
import asyncQueueWorker from './async-queue';
import queueWorker from './queue';
import fastqWorker from './fastq';

const workers = {
	'henrygd-queue': hgdWorker,
	'p-limit': pLimitWorker,
	'promise-queue': promiseQueueWorker,
	'async-queue': asyncQueueWorker,
	queue: queueWorker,
	fastq: fastqWorker,
} as Record<string, () => Promise<Response>>;

export default {
	async fetch(request): Promise<Response> {
		const path = request.url.split('/').at(-1) ?? '_';

		if (path in workers) {
			return workers[path]();
		}

		return new Response(`Unknown path: ${path}`, { status: 404 });
	},
} satisfies ExportedHandler<Env>;
