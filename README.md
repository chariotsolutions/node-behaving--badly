# node-behaving--badly

This is why we can't have nice things.  You shouldn't do the following things directly in Node user-land JavaScript (i.e. the Event Loop) without understanding why:

* Template processing
* Heavy-duty collections processing
* High-cpu work

This repo is a sandbox for writing terribly performing code in Node.js so you can observe it and see how problems might occur in the field.  Some of the ideas here:

* Using functional methods from tools like ramda and async to process large amounts of data
* Wasting memory in terrible ways
* Causing everybody to think your code is dead by starving the event loop

Now I assume your code won't behave like this! Use N|Solid or other tools to profile it and slay those terribly performing dragons.
Enjoy?

Ken Rimple
July 2016
