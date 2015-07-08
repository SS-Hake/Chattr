var db = require('../../db')

describe('making a port', function() {
	it('logs in and creates a new post', function() {
		//Go to homepage
		browser.get('http://localhost:3001')
		//click login
		element(by.css('nav .login')).click()
		//fill out and submit login form
		element(by.model('username')).sendKeys('ADAM')
		element(by.model('password')).sendKeys('pass')
		element(by.css('form .btn')).click()
		//submit a post on the posts page
		var post = 'New selenium post!'
		browser.get('http://localhost:3001')
		element(by.model('postBody')).sendKeys(post)
		element(by.css('form .btn')).click()

		//user should now see their post as the first post on the page.
	})
	afterEach(function () {
		db.connection.db.dropDatabase()
	})
})