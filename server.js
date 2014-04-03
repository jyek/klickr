var app = require('./server-config.js');

var hostname = process.env.HOSTNAME || 'localhost';
var port = process.env.KLICKR_PORT || 4568;

app.listen(port, hostname);

console.log('Server now listening on port ' + port);