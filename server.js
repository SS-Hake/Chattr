var express = require('express'),
	bodyParser = require('body-parser'),
	websockets = require('./websockets'),
	Post = require('./models/post'),
	app = express();

app.use(require('./auth'))
app.use(bodyParser.json())
app.use('/api/posts', require('./controllers/api/posts.js'))
//Mount authentication controllers.
app.use('/api/sessions', require('./controllers/api/sessions'))
app.use('/api/users', require('./controllers/api/users'))
app.use(require('./controllers/static'))

app.get('/', function(req, res) {
	res.sendfile('layouts/posts.html');
})

var port = process.env.PORT || 3000
var server = app.listen(port, function() {
	console.log('Server', process.pid, 'listening on', port)
})
websockets.connect(server)

