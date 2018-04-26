import noUnusedVars from 'eslint/lib/rules/no-unused-vars';

const { meta } = noUnusedVars;

meta.schema[0].oneOf.find(x => x.type === 'object').properties.ignoreDestructuredVarsWithRest = {
	type: 'boolean',
};

export default {
	meta,
	create(context) {
		const [ options ] = context.options;

		let proxyContext = context;
		if (typeof options === 'object' && options.ignoreDestructuredVarsWithRest) {
			// ESLint freezes context, so can't monkey patch directly
			proxyContext = Object.create(context);
			Object.defineProperty(proxyContext, 'report', {
				value: function report(...args) {
					const node = args.length === 1 ? args[0].node : args[0];

					if (isDestructuredVarWithRestProperty(node)) {
            // ignore reports for nodes passing the test
						return;
					}

					context.report(...args);
				},
				writable: true,
				enumerable: true,
				configurable: true,
			});
		}

		// create the core rule with the patched context
		return noUnusedVars.create(proxyContext);
	},
};

function isDestructuredVarWithRestProperty(node) {
	const { parent } = node;
	return parent &&
		parent.type === 'Property' &&
		parent.parent.type === 'ObjectPattern' &&
		parent.parent.properties.some(p => p.type === 'ExperimentalRestProperty');
}
