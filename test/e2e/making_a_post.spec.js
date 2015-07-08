var db = require('../../db')
var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect

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
		var post = 'New selenium post!' + Math.random()
		browser.get('http://localhost:3001')
		element(by.model('postBody')).sendKeys(post)
		element(by.css('form .btn')).click()

		expect(element.all(by.css('ul.list-group li')).first().getTExt()).to.eventually.contain(post)

		}
		//user should now see their post as the first post on the page.
	})
	//Clean the database after test if required.
	/*afterEach(function () {
		db.connection.db.dropDatabase()
	})*/
})