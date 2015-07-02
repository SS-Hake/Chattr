var Post = require('../../models/post');
var router = require('express').Router();
var websockets = require('../../websockets');

router.get('/', function(req, res, next) {
	console.log("[+] Getting data...");
	Post.find()
	.sort('-date')
	.exec(function(err, posts) {
		if(err) return next(err);
		res.json(posts);
	})	
})

router.post('/', function(req, res, next) {
	var post = new Post({body: req.body.body})
	//Test to see if anyone is logged in.
	//console.log(req.auth)
	post.username = req.auth.username
	post.save(function(err, post) {
		if(err) {return next(err)}
		//Broadcast the new message to all clients logged in.
		websockets.broadcast('new_post', post)
		res.json(201, post)
	})
})

module.exports = router