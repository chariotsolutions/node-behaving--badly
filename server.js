var bluebird  = require('bluebird');
var express = require('express');
var app = express();
var faker = require('faker');
var R = require('ramda');

var names = [];
for (let i = 0; i < 10000000; i++) {
  var randomName = faker.name.firstName();
  names.push(randomName);
}
console.log('generated names');

app.get('/tightloop', function (req, res) {
    var i = 0;
    for (let i = 0; i < 10000000000; i++) {
      j = i - 1.5 * i;
      if (j % 20000000) console.log('.');
      setTimeout(() => { }, 0);
    }
    res.send(200, "I am all done now.");
});

app.get('/growit', function(req, res) {
    var elements = [];
    while (true) {
      setTimeout(() => {
          elements.push(Math.random(23423423));
      },0);
    }
});

app.get('/functionaldunctional', function(req, res) {
    // do some sort of crazy functional thing here
    var halves = R.groupBy(function(name) {
        let ucname = name.toUpperCase();
        return name[0] >= 'A' && name[0] <= 'M' ? 'ATOM' :
               name[0] >= 'N' && name[0] <= 'Z' ? 'NTOZ' : 'UNKNOWN';
    });
    var remapped = R.map(result => { 
        let keyCount = Object.keys(result).length;
        return { key: keyCount};
    });
     setTimeout(() => { 
        let groups = halves(names);
        let results = remapped(groups);
        res.send(200, results);
     }, 100);
});

app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
});
