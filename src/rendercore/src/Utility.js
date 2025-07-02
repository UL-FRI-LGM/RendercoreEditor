export class Utility extends Object {


	static TYPE = {
		NULL: "object",
		UNDEFINED: "undefined",
		BOOLEAN: "boolean",
		NUMBER: "number",
		BIGINT: "bigint",
		STRING: "string",
		SYMBOL: "symbol",
		FUNCTION: "function",
		OBJECT: "object",
	};

	static isPrimitive(value) {
		// return value !== Object(value);
		return value === null || (typeof value !== Utility.TYPE.FUNCTION && typeof value !== Utility.TYPE.OBJECT);
	};
	static arePrimitives(...values) {
		return values.reduce((acc, v, k) => { return acc && Utility.isPrimitive(v); }, true);
	}
	static isFunction(value) {
		// return value === Object(value) && typeof value === Utility.TYPE.FUNCTION;
		return typeof value === Utility.TYPE.FUNCTION;
	};
	static areFunctions(...values) {
		return values.reduce((acc, v, k) => { return acc && Utility.isFunction(v); }, true);
	}
	static isObject(value) {
		// return value === Object(value) && typeof value !== Utility.TYPE.FUNCTION;
		return value !== null && typeof value === Utility.TYPE.OBJECT;
	};
	static areObjects(...values) {
		return values.reduce((acc, v, k) => { return acc && Utility.isObject(v); }, true);
	}

	static arePrimitivesSameType(p1, ...rest) {
		// return typeof p1 === typeof p2;
		return rest.reduce((acc, v_p, k_p) => { return acc && (typeof p1 === typeof v_p); }, true);
	}
	static areObjectsSameClass(o1, ...rest) {
		// return o1.constructor === o2.constructor;
		return rest.reduce((acc, v_o, k_o) => { return acc && (o1.constructor === v_o.constructor); }, true);
	}

	static arePrimitivesCompatible(v1, ...values) {
		return Utility.arePrimitives(v1, ...values) && Utility.arePrimitivesSameType(v1, ...values);
	}
	static areObjectsCompatible(v1, ...values) {
		return Utility.areObjects(v1, ...values) && Utility.areObjectsSameClass(v1, ...values);
	}

	static copyValue(v1, v2) {
		return Utility.arePrimitivesCompatible(v1, v2) ? v2 : Utility.areObjectsCompatible(v1, v2) ? v1.copy(v2) : undefined;
	}
	static cloneValue(v) {
		return Utility.isPrimitive(v) ? v : v.clone();
	}


	constructor(args = {}) {
		super(args);
	}
};
