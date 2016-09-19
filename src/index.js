import noUnusedVarsRest from './rules/no-unused-vars-rest';

// use commonjs default export so ESLint can find the rule
module.exports = {
	rules: {
		'no-unused-vars-rest': noUnusedVarsRest,
	},
	configs: {
		recommended: {
			rules: {
				'no-unused-vars': 0,
				'no-unused-vars-rest/no-unused-vars-rest': [ 2, { ignoreDestructuredVarsWithRest: true }],
			},
		},
	},
};
