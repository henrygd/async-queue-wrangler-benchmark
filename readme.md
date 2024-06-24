### About

Benchmark of popular async queue libraries (and also mine) in workerd.

All libraries run the exact same test, so `promise-queue` and `p-limit` are not penalized by having to use `Promise.all` (they don't provide a promise that resolves when the queue is empty).

### Results

| Library                                                         | Requests/sec | Total (sec) | Average | Slowest |
| :-------------------------------------------------------------- | :----------- | :---------- | :------ | :------ |
| [@henrygd/queue](https://github.com/henrygd/queue)              | 816.1074     | 1.2253      | 0.0602  | 0.0864  |
| [promise-queue](https://github.com/promise-queue/promise-queue) | 647.2809     | 1.5449      | 0.0759  | 0.1149  |
| [fastq](https://github.com/mcollina/fastq)                      | 336.7031     | 3.0877      | 0.1459  | 0.2080  |
| [async.queue](https://github.com/caolan/async)                  | 198.9986     | 5.0252      | 0.2468  | 0.3544  |
| [queue](https://github.com/jessetane/queue)                     | 85.6483      | 11.6757     | 0.5732  | 0.7629  |
| [p-limit](https://github.com/sindresorhus/p-limit)              | 77.7434      | 12.8628     | 0.6316  | 0.9585  |

### Start server

```bash
pnpm i && pnpm dev
```

### Benchmark

Sends 100 requests to warm up the server, then 1000 requests to benchmark using [oha](https://github.com/hatoo/oha).

Changing the warm up path doesn't make a difference. It compiles to a single file and each test is standalone. I tested with fastq and got a longer time, so warm up is left on henrygd-queue to have a more uniform warm up time.

```bash
# @henrygd/queue
oha --no-tui -n 100 http://localhost:8787/henrygd-queue > /dev/null && oha -n 1000 http://localhost:8787/henrygd-queue
# promise-queue
oha --no-tui -n 100 http://localhost:8787/henrygd-queue > /dev/null && oha -n 1000 http://localhost:8787/promise-queue
# async.queue
oha --no-tui -n 100 http://localhost:8787/henrygd-queue > /dev/null && oha -n 1000 http://localhost:8787/async-queue
# fastq
oha --no-tui -n 100 http://localhost:8787/henrygd-queue > /dev/null && oha -n 1000 http://localhost:8787/fastq
# queue
oha --no-tui -n 100 http://localhost:8787/henrygd-queue > /dev/null && oha -n 1000 http://localhost:8787/queue
# p-limit
oha --no-tui -n 100 http://localhost:8787/henrygd-queue > /dev/null && oha -n 1000 http://localhost:8787/p-limit
```
