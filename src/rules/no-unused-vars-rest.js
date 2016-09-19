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
			proxyContext = new Proxy(context, {
				get(target, property, receiver) {
					if (property === 'report') {
						return function report(descriptor) {
							const { node } = descriptor;
							if (isDestructuredVarWithRestProperty(node)) {
								return;
							}

							context.report(descriptor);
						};
					}

					return Reflect.get(target, property, receiver);
				},
			});
		}

		return noUnusedVars.create(proxyContext);
	},
};

function isDestructuredVarWithRestProperty(node) {
	const { parent } = node;
	return parent.type === 'Property' &&
		parent.parent.type === 'ObjectPattern' &&
		parent.parent.properties.some(p => p.type === 'ExperimentalRestProperty');
}
