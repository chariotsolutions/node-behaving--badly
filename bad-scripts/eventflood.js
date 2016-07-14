var EventEmitter = require('events'),
    emitter = new EventEmitter();

emitter.addListener('ping', function createLoad(event, payload) {
  var i, j = [];
  // inane code drivel....

  for (i = 0; i < 10000000; i++) {
    var x = i / 4.00033;
    j.push(x);
  }
});

var cancel = setInterval(function sendPing() {
  emitter.emit('ping', { data: 'abcde' }); }, 500);

setTimeout(function() {
  clearInterval(cancel);
  cancel = setInterval(function sendPing() {
    emitter.emit('ping', { data: 'abcde' }); }, 50000);
}, 20000);





