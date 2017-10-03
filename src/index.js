const Base = require('atma-io-middleware-base');
const Compiler = require('./compiler');

module.exports = Base.create({
	name: 'atma-io-middleware-eslint',
	defaultOptions: {
		embedWarnings: true,
		logger: {
			type: 'std'
		},
		throwOnError: false,
		eslint: {},
		extensions: [ 'js', 'es6' ]
	},
	process: Compiler.process
});