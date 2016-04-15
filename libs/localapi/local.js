var express = require('express');

//local server
var localserver = express();

localserver.use('/api', require('./api'));

var server = localserver.listen(1337, function () {
  console.log('server listening on %d', server.address().port)
})

module.exports = server;
