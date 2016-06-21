# node-behaving--badly

This is why we can't have nice things.  You shouldn't do the following things directly in Node without understanding why:

* Template processing
* Collections processing
* High-cpu work

All of these things will block the event loop.

Try this against the repo once you do an `npm install` and a `node server.js`:

ab -n 100 -i 6 http://localhost:3000/functionalnative

* Runs 100 iterations, 6 at a time
* Reports benchmark results after running

You should see a big red flag here:

```text
Concurrency level: 1
```

So a node engine will only allow one thing at a time to consume its CPU. If you're coming fom a thread or worker background, consider each node instance a worker.

## To fix this situation you need a load balancer

Node is a butler, not a worker.  You can install `pm2` (with `npm install -g pm2` and then fire up as many server instances as you have CPU nodes:

```bash
pm2 start server.js -i -1
```

Then you can monitor it with `pm2 monit` and fire up your requests, which will be spread across nodes.

## Benchmark URLs

First, our Name API test - maps over 100000 randomly generated names with `faker` - reports the count from A-M and N-Z.

* `/functionalnative` - use the native built-in V8 Array.prototype.reduce
* `/functionalramda` - use the RamdaJS library
* `/functionalasync` - use the Async library and `process.nextTick`

CPU test next - peg the CPU

* `/tightloop` just burn up the CPU with a tight loop

Memory test w/core dump - overload Node

* `/growit` - keep pushing elements onto an array until it blows up


