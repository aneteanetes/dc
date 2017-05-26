export module dc {
	export class Clonable {
		clone(target?: any): any {
			return dc.clone(this, target);
		}
	}

	export function clone(source: any, target?: any) {
		if (!target)
			target = {};

		var _props = props(source).filter(x => notCore(x));
		_props.forEach(key => {
			if (typeof source[key] === 'function') {
				target[key] = (...args: any[]) => {
					(source[key] as any).apply(target, args);
				};
			} else
				target[key] = source[key];
		});
	}

	function notCore(key: string) {
		return ["constructor",
			"clone",
			"__defineGetter__",
			"__defineSetter__",
			"hasOwnProperty",
			"__lookupGetter__",
			"__lookupSetter__",
			"propertyIsEnumerable",
			"__proto__",
			"toString",
			"toLocaleString",
			"valueOf",
			"isPrototypeOf"].indexOf(key) == -1;
	}

	function props(obj: any): string[] {
		var p = [];
		for (; obj != null; obj = Object.getPrototypeOf(obj)) {
			var op = Object.getOwnPropertyNames(obj);
			for (var i = 0; i < op.length; i++)
				if (p.indexOf(op[i]) == -1)
					p.push(op[i]);
		}
		return p;
	}
}