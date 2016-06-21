# node-behaving--badly

This is why we can't have nice things.  You shouldn't do the following things directly in Node without understanding why:

* Template processing
* Collections processing
* High-cpu work

All of these things will block the event loop.

Try this against the repo once you do an `npm install` and a `node server.js`:

ab -n 10 http://localhost:3000/functionaldunctional

Concurrency level: 1

Whoops!

Node is a butler, not a worker.
