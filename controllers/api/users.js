var router = require('express').Router(),
	bcrypt = require('bcrypt'),
	jwt = require('jwt-simple'),
	User = require('../../models/user'),
	config = require('../../config');

router.get('/', function(req, res, next) {
	if(!req.headers['x-auth']) {
		return res.send(401)
	}
	var auth = jwt.decode(req.headers['x-auth'], config.secret)
	User.findOne({username: auth.username}, function(err, user) {
		if(err) return next(err)
		res.json(user)
	})
})

router.post('/', function(req, res, next) {
	var user = new User({username: req.body.username})
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		if(err) return next(err)
		user.pass = hash
		user.save(function(err) {
			res.send(201)
		})
	})
})

module.exports = router