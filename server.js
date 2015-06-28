var express = require('express'),
	bodyParser = require('body-parser'),
	Post = require('./models/post');

var app = express()
app.use(bodyParser.json())
app.use('/api/posts', require('./controllers/api/posts.js'))
app.use(require('./controllers/static'))

app.get('/', function(req, res) {
	res.sendfile('layouts/posts.html');
})

app.listen(3000, function() {
	console.log('[+] Chattr listening on port 3000...')
})

