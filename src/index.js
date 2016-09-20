import noUnusedVarsRest from './rules/no-unused-vars';

// use commonjs default export so ESLint can find the rule
module.exports = {
	rules: {
		'no-unused-vars': noUnusedVarsRest,
	},
	configs: {
		recommended: {
			plugins: [ 'no-unused-vars-rest' ],
			rules: {
				'no-unused-vars': 0,
				'no-unused-vars-rest/no-unused-vars': [ 2, { ignoreDestructuredVarsWithRest: true }],
			},
		},
	},
};
