var _ = require('lodash'),
	ws = require('ws'),
	clients = [];

//On connection push new client to the array. On disconnect, 
//remove them from list using lodash
exports.connect = function(server) {
	var wss = new ws.Server({server: server})
	wss.on('connection', function(ws) {
		clients.push(ws)
		console.log("[+] Client pushed...")
		exports.broadcast('New client joined')
		ws.on('close', function() {
			_.remove(clients, ws)
			console.log("[+] Client popped...")
		})
	})
}

exports.broadcast = function(topic, data) {
	var json = JSON.stringify({topic: topic, data: data})
	clients.forEach(function(client) {
		client.send(json)
	})
}






/*
exports.connect = function(server) {
	var wss = new ws.Server({server: server})
	wss.on('connection', function(ws) {
		ws.send('[+] Websockets connected...')
		ws.on('message', function incoming(message) {
			ws.send('Got the message: ' + message)
			if(message === 'Wassup') {
				ws.send('Not much, you?')
			}
		})
	})
}*/