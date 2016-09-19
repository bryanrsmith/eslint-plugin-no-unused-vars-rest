import eslint from 'eslint';
import plugin from '../../src';

const rule = plugin.rules['no-unused-vars-rest'];

const ruleTester = new eslint.RuleTester();
const parserOptions = { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true }};

ruleTester.run('no-unused-vars-rest', rule, {
	valid: [
		{ code: 'var {x, ...rest} = { x: 1, y: 2}; foo(x, rest);', parserOptions },
		{ code: 'var {x, ...rest} = { x: 1, y: 2}; foo(rest);', options: [{ ignoreDestructuredVarsWithRest: true }], parserOptions },
		{ code: 'var {x, ...rest} = test; foo(rest);', options: [{ ignoreDestructuredVarsWithRest: true }], parserOptions },
		{ code: 'var {y: {z, ...rest }} = test; foo(rest);', options: [{ ignoreDestructuredVarsWithRest: true }], parserOptions },
		{ code: 'var {x, y: {z, ...rest2 }, ...rest} = test; foo(rest, rest2);', options: [{ ignoreDestructuredVarsWithRest: true }], parserOptions },
		{ code: 'var {...rest, x} = { x: 1, y: 2}; foo(rest);', options: [{ ignoreDestructuredVarsWithRest: true }], parserOptions },
		{ code: '(function({ x, ...rest }) { foo(rest); })()', options: [{ ignoreDestructuredVarsWithRest: true }], parserOptions },

		{ code: 'var {x, ...rest} = { x: 1, y: 2}; foo(x, rest);', parser: 'babel-eslint' },
		{ code: 'var {x, ...rest} = { x: 1, y: 2}; foo(rest);', options: [{ ignoreDestructuredVarsWithRest: true }], parser: 'babel-eslint' },
		{ code: 'var {x, ...rest} = test; foo(rest);', options: [{ ignoreDestructuredVarsWithRest: true }], parser: 'babel-eslint' },
		{ code: 'var {...rest, x} = { x: 1, y: 2}; foo(rest);', options: [{ ignoreDestructuredVarsWithRest: true }], parser: 'babel-eslint' },
		{ code: '(function({ x, ...rest }) { foo(rest); })()', options: [{ ignoreDestructuredVarsWithRest: true }], parser: 'babel-eslint' },
	],
	invalid: [
		{
			code: 'var {x, ...rest} = { x: 1, y: 2}; foo(rest);',
			errors: [{ message: '\'x\' is defined but never used.' }],
			parserOptions,
		},
		{
			code: 'var {x, ...rest} = test; foo(rest);',
			errors: [{ message: '\'x\' is defined but never used.' }],
			parserOptions,
		},
		{
			code: 'var {x, y: { z, ...rest }} = test; foo(rest);',
			errors: [{ message: '\'x\' is defined but never used.' }],
			options: [{ ignoreDestructuredVarsWithRest: true }],
			parserOptions,
		},
		{
			code: 'var {y: { z }, ...rest} = test; foo(rest);',
			errors: [{ message: '\'z\' is defined but never used.' }],
			options: [{ ignoreDestructuredVarsWithRest: true }],
			parserOptions,
		},
		{
			code: 'var {...rest, x} = { x: 1, y: 2}; foo(rest);',
			errors: [{ message: '\'x\' is defined but never used.' }],
			parserOptions,
		},
		{
			code: '(function({ x, ...rest }) { foo(rest); })()',
			errors: [{ message: '\'x\' is defined but never used.' }],
			parserOptions,
		},

		{
			code: 'var {x, ...rest} = { x: 1, y: 2}; foo(rest);',
			errors: [{ message: '\'x\' is defined but never used.' }],
			parser: 'babel-eslint',
		},
		{
			code: 'var {x, ...rest} = test; foo(rest);',
			errors: [{ message: '\'x\' is defined but never used.' }],
			parser: 'babel-eslint',
		},
		{
			code: 'var {...rest, x} = { x: 1, y: 2}; foo(rest);',
			errors: [{ message: '\'x\' is defined but never used.' }],
			parser: 'babel-eslint',
		},
		{
			code: '(function({ x, ...rest }) { foo(rest); })()',
			errors: [{ message: '\'x\' is defined but never used.' }],
			parser: 'babel-eslint',
		},
	],
});
