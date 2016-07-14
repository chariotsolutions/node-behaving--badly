var EventEmitter = require('events'),
    emitter = new EventEmitter();

var ary = [];
var chars = [];
var randomChars = function() {
  var numChars = Math.random() * 990;
  var chars = [];
  for (var i = 0; i < numChars; i++) {
    chars.push(String.fromCharCode(97 + Math.random() * 26));
  }
  return new String(chars);
}

emitter.addListener('ping', function processPing(event, payload) {
    var end = (Math.random() * 10) * 100000;
    var arysize = (Math.random() * 10) * 10000;
    chars.concat(randomChars());
    for (var i = 0; i < end; i++) {
      var x = 234 * i % 45;
    }
    for (i = 0; i < arysize; i++) {
      ary.push('asdflkjas dfljkasdfklas jdflkasjdf lkasd fj' 
           + i * Math.random());
    }

    if (arysize % 3 === 0) {
      ary = [];
      chars = [];
    }

});

setInterval(function sendPing() { 
   emitter.emit('ping', { data: 'abcde' }); }, 500);

