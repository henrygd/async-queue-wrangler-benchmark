### About

Benchmark of popular async queue libraries (and also mine) in workerd.

### Results

| Library                                                         | Requests/sec | Total (sec) | Average | Slowest |
| :-------------------------------------------------------------- | :----------- | :---------- | :------ | :------ |
| [@henrygd/queue](https://github.com/henrygd/queue)              | 660.3245     | 1.5144      | 0.0744  | 0.1097  |
| [promise-queue](https://github.com/promise-queue/promise-queue) | 349.1807     | 2.8638      | 0.1408  | 0.1947  |
| [fastq](https://github.com/mcollina/fastq)                      | 323.8708     | 3.0877      | 0.1514  | 0.2053  |
| [async.queue](https://github.com/caolan/async)                  | 199.7961     | 5.0051      | 0.2458  | 0.3492  |
| [queue](https://github.com/jessetane/queue)                     | 84.9245      | 11.7752     | 0.5784  | 0.8502  |
| [p-limit](https://github.com/sindresorhus/p-limit)              | 67.6111      | 14.7905     | 0.7260  | 0.9606  |

### Start server

```bash
pnpm i && pnpm dev
```

### Benchmark

Sends 100 requests to warm up the server, then 1000 requests to benchmark using [oha](https://github.com/hatoo/oha).

Changing the warm up path doesn't make a difference. It compiles to a single file and each test is standalone. I tested with fastq and got a longer time, so warm up is left on henrygd-queue to save time.

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
