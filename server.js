var express = require('express'),
	bodyParser = require('body-parser'),
	Post = require('./models/post'),
	app = express();

app.use(bodyParser.json())
app.use('/api/posts', require('./controllers/api/posts.js'))
//Mount authentication controllers.
app.use('/api/sessions', require('./controllers/api/sessions'))
app.use('/api/users', require('./controllers/api/users'))
app.use(require('./controllers/static'))

app.get('/', function(req, res) {
	res.sendfile('layouts/posts.html');
})

app.listen(3000, function() {
	console.log('[+] Chattr listening on port 3000...')
})

