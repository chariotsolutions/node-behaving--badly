var bluebird  = require('bluebird');
var express = require('express');
var app = express();
var faker = require('faker');
var R = require('ramda');
var async = require('async');

var names = [];
for (var i = 0; i < 1000000; i++) {
  var randomName = faker.name.firstName();
  names.push(randomName);
}
console.log('generated names');

app.use(express.static('public'));

app.get('/', function staticcontent(req, res) {
    res.send('<html><body>simple page content.</body></html>');
});

app.get('/tightloop', function tightloop(req, res) {
    function blockCpuFor(ms) {
        var now = new Date().getTime();
        var result = 0
        while(shouldRun) {
            result += Math.random() * Math.random();
            if (new Date().getTime() > now +ms) {
                console.log('exiting...');
                res.status(200).send( "I am all done now.");

            }
        }   
    }

    function start(req) {
        shouldRun = true;
        process.nextTick(blockCpuFor(1000*.5));
        setTimeout(start(req), 1000* (1 - desiredLoadFactor));
    }

    start(req);
});

app.get('/growit', function growit(req, res) {
    var elements = [];
    for (var i = 0; i < 1000000; i++) {
          elements.push(Math.random(23423423));
    }
    res.status(200).send("We have " + i + " elements.");
});

app.get('/functionalnative', function functionalnative(req, res) {
    var initial = { 'ATOM': 0, 'NTOZ': 0 };
    // do some sort of crazy functional thing here
    function reducer(memo, name) {
      var ucname = name.toUpperCase();
      if (ucname[0] >= 'A' && ucname[0] <= 'M') {
        memo['ATOM'] = memo['ATOM'] + 1;
      } else {
        memo['NTOZ'] = memo['NTOZ'] + 1;
      }
      return memo;
    }    
    var result = names.reduce(reducer, initial, names);
    res.status(200).send( result);
  });


app.get('/functionalramda', function functionalramda(req, res) {
    var initial = { 'ATOM': 0, 'NTOZ': 0 };
    // do some sort of crazy functional thing here
    function reducer(memo, name) {
      var ucname = name.toUpperCase();
      if (ucname[0] >= 'A' && ucname[0] <= 'M') {
        memo['ATOM'] = memo['ATOM'] + 1;
      } else {
        memo['NTOZ'] = memo['NTOZ'] + 1;
      }
      return memo;
    }    
    var result = R.reduce(reducer, initial, names);
    res.status(200).send( result);
  });

// here's what you get when you run without setTimeout - an endless loop.
// you need to call a callback (see the next one)
app.get('/functionalasync-noyield', function functionalasync(req, res) {
  async.reduce(names, {'ATOM': 0, 'NTOZ': 0}, function doItSync(memo, name) {
   var ucname = name.toUpperCase();
   if (ucname[0] >= 'A' && ucname[0] <= 'M') {
     memo['ATOM'] = memo['ATOM'] + 1;
   } else if(ucname[0] >= 'N' && ucname[0] <= 'Z') {
     memo['NTOZ'] = memo['NTOZ'] + 1;
   }
   return memo;
  },
  function(err, result) {
    res.status(200).send( result);  
  });
  
});

app.get('/functionalasync-yield', function functionalasync(req, res) {
  async.reduce(names, {'ATOM': 0, 'NTOZ': 0}, function doItAsync(memo, name, callback) {
   var ucname = name.toUpperCase();
   if (ucname[0] >= 'A' && ucname[0] <= 'M') {
     memo['ATOM'] = memo['ATOM'] + 1;
   } else if(ucname[0] >= 'N' && ucname[0] <= 'Z') {
     memo['NTOZ'] = memo['NTOZ'] + 1;
   }
   // important - forgetting to call callback on the next tick
   // will cause a stack blow-out.
   setImmediate(function asyncAnswerOnTick() {
      callback(null, memo);
   });
  },
  function(err, result) {
    res.status(200).send( result);  
  });
});

app.get('/rawdata', function rawdata(req, res) {
    res.status(200).send( names);
});

app.listen(3033, function () {
      console.log('Example app listening on port 3033!');
});
