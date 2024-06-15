### About

Benchmark of popular async queue libraries (and also mine) in workerd.

### Results

| Library                                                         | Requests/sec | Total (sec) | Average | Slowest |
| :-------------------------------------------------------------- | :----------- | :---------- | :------ | :------ |
| [@henrygd/queue](https://github.com/henrygd/queue)              | 622.7809     | 1.6057      | 0.0786  | 0.1155  |
| [promise-queue](https://github.com/promise-queue/promise-queue) | 324.8053     | 3.0788      | 0.1512  | 0.2174  |
| [async.queue](https://github.com/caolan/async)                  | 203.9315     | 4.9036      | 0.2408  | 0.3450  |
| [fastq](https://github.com/mcollina/fastq)                      | 184.0524     | 5.4332      | 0.2670  | 0.3546  |
| [queue](https://github.com/jessetane/queue)                     | 86.4867      | 11.5625     | 0.5672  | 0.7636  |
| [p-limit](https://github.com/sindresorhus/p-limit)              | 67.5275      | 14.8088     | 0.7274  | 1.0657  |

### Start server

```bash
pnpm i && pnpm dev
```

### Benchmark

Sends 100 requests to warm up the server, then 1000 requests to benchmark using [oha](https://github.com/hatoo/oha).

Changing the warm up path doesn't make a difference (I tested with fastq and got a longer time) so it's left on henrygd-queue to save time.

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
