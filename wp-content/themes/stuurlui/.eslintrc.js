module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es2021': true
	},
	'extends': ['plugin:@wordpress/eslint-plugin/jshint'],
	'parserOptions': {
		'ecmaVersion': 12
	},
	'rules': {
		'one-var': [ 'error', 'never' ],
	}
};
