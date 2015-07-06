exports.config = {
	framework: 'mocha',
	specs: [
		'test/e2e/**/*.spec.js'
	],
	chromeOnly: true,
	mochaOpts: {
		enableTimeouts: false
	},
	onPrepare: function() {
		require('./server')
	}
}