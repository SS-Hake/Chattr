var express = require('express')
var jwt = require('jwt-simple')
var _ = require('lodash')
var app = express()
var bcrypt = require('bcrypt')
var User = require('./user')

app.use(require('body-parser').json())

var users = [{username: 'SAM', password: '$2a$10$FbIj771WjVKRxGX6v9XpBeE9BDynnIguxr6XZpxooV0CvyYdmnS86'}]
var secretKey = 'superseecritkey'

function findUserByUsername(username) {
	return _.find(users, {username: username})
}

function validateUser(user, password) {
	return user.password === password
}

app.post('/session', function(req, res, next) {
	//lookup the username with mongoose's findOne
	User.findOne({username: req.body.username}, function(err, user) {
		if(err) return next(err)
		if(!user) return res.sendStatus(401)
		//If successful compare the provided password to the stored one - hashes
		bcrypt.compare(req.body.password, user.password, function(err, valid) {
			if(err) return next(err)
			if(!valid) return res.send(401)

			var token = jwt.encode({username: user.username}, secretKey)
			res.json(token)
		})
	})
	if(!validateUser(user, req.body.password)) {
		return res.sendStatus(401) //Authorisation fails - send 401 error
	}
	var token = jwt.encode({username: user.username}, secretKey)
	res.json(token)
})

app.post('/user', function(req, res, next) {
	var user = new User({username: req.body.username})
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		user.password = hash
		user.save(function(err, user) {
			if(err) throw next(err)

			res.send(201)
		})
	})
})

app.get('/user', function(req, res) {
	var token = req.headers['x-auth']
	var auth = jwt.decode(token, secretKey)
	//TODO: pull user info from mongo
	User.findOne({username: auth.username}, function(err, user) {
		res.json(user)
	})
	res.json(user)
})

app.listen(3000)