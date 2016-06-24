var bluebird  = require('bluebird');
var express = require('express');
var app = express();
var faker = require('faker');
var R = require('ramda');
var async = require('async');

var names = [];
for (var i = 0; i < 10000000; i++) {
  var randomName = faker.name.firstName();
  names.push(randomName);
}
console.log('generated names');

app.get('/', function staticcontent(req, res) {
    res.send('<html><body>simple page content.</body></html>');
});

app.get('/tightloop', function tightloop(req, res) {
    var i = 0;
    for (var i = 0; i < 10000000000; i++) {
      j = i - 1.5 * i;
      if (j % 20000000) console.log('.');
      setTimeout(() => { }, 0);
    }
    res.status(200).send( "I am all done now.");
});

app.get('/growit', function growit(req, res) {
    var elements = [];
    while (true) {
      setTimeout(() => {
          elements.push(Math.random(23423423));
      },0);
    }
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

// TODO - overkill?
app.get('/functionalasync', function functionalasync(req, res) {
  async.reduce(names, {'ATOM': 0, 'NTOZ': 0}, function functionalasync(memo, name, callback) {
   var ucname = name.toUpperCase();
   if (ucname[0] >= 'A' && ucname[0] <= 'M') {
     memo['ATOM'] = memo['ATOM'] + 1;
   } else if(ucname[0] >= 'N' && ucname[0] <= 'Z') {
     memo['NTOZ'] = memo['NTOZ'] + 1;
   }
   process.nextTick(function() {
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

app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
});
