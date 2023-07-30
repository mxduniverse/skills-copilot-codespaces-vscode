// create web server
// run node comments.js
// open browser: http://localhost:3000
// open another browser: http://localhost:3000
// use different browsers to test

var http = require('http');
var items = []; // store data in memory

var server = http.createServer(function(req, res){
	switch (req.method) {
		case 'POST':
			var item = '';
			req.setEncoding('utf8');
			req.on('data', function(chunk){
				item += chunk;
			});
			req.on('end', function(){
				items.push(item);
				res.end('OK\n');
			});
			break;
		case 'GET':
			items.forEach(function(item, i){
				res.write(i + ') ' + item + '\n');
			});
			res.end();
			break;
	}
});

server.listen(3000);