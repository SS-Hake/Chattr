/*var router = require('express').Router(),
	User = require('../../models/user'),
	bcrypt = require('bcrypt'),
	jwt = require('jwt-simple'),
	config = require('../../config');

router.post('/', function(req, res, next) {
	console.log("[+] Username entered: " + req.body.username)
	console.log(User.findOne({username: req.body.username}).select('username'))
	console.log(User.findOne({username: 'SAM'}))
	var username = req.body.username
	User.findOne({username: username})
	.select('password').select('username')
	.exec(function(err, user) {
		if(err) return next(err)
		console.log("This is the error");
		if(!user) return res.send(401)
		bcrypt.compare(req.body.password, user.password, function(err, valid) {
			if(err) return next(err)
			if(!valid) return res.send(401)
			var token = jwt.encode({username: user.username}, config.secret)
			res.send(token)
		})
	})
})
module.exports = router*/
var router = require('express').Router()
var bcrypt = require('bcrypt')
var jwt    = require('jwt-simple')
var config = require('../../config')
var User   = require('../../models/user')

// Note that the book had this as router.post('/' but had this router mounted at '/api/sessions'.
// In this code it's mounted at '/api' and is router.post('/sessions'
// Either way will be fine, but the full URL should be '/api/sessions'
router.post('/', function (req, res, next) {
  var username = req.body.username
  console.log(username)
  User.findOne({ username: username }, function(err, doc) {
  	console.log("This")
  	console.log(doc); 
  });
  //console.log(User.findOne({username: username}))
  User.findOne({username: username})
  .select('password')
  .exec(function (err, user) {
    if (err) { return next(err) }
    if (!user) { return res.sendStatus(401) }
    bcrypt.compare(req.body.password, user.password, function (err, valid) {
      if (err) { return next(err) }
      if (!valid) { return console.log("error!")/*res.sendStatus(401)*/ }
      var token = jwt.encode({username: username}, config.secret)
      res.send(token)
    })
  })
})

module.exports = router
