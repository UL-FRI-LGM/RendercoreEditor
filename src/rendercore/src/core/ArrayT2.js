import { ArrayObjectBase } from "./ArrayObjectBase.js";
import { ErrorT2 } from "../ErrorT2.js";
import { Utility } from "../Utility.js";


export class ArrayT2 extends ArrayObjectBase {


	static DEFAULT = {
		TYPE: "ArrayT2",
		NAME: "",
	};


	constructor(args = {}, ...rest) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : ArrayT2.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : ArrayT2.DEFAULT.NAME,
			},
			...rest
		);
	}


	copy(arrayT2, copyValues = true) {
		if (!(arrayT2 instanceof ArrayT2)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

		return copyValues ? ArrayT2.zip(this, arrayT2).reduce((acc_this, [v1, v2], k) => {
			// return (acc_this[k] = Utility.copyValue(v1, v2), acc_this);
			return acc_this.replace(k, Utility.copyValue(v1, v2));
		}, super.copy(arrayT2)) : super.copy(arrayT2);
	}
	// clone() {
	// 	return new ArrayT2(this, ...this);
	// }
	clone(cloneValues = true) {
		// return this.map((v) => { return Utility.cloneValue(v); });
		return new ArrayT2(
			Object.assign(super.clone(), {}),
			// ...(cloneValues ? [...this].map((v, i) => { return Utility.cloneValue(v); }) : this)
			// ...(cloneValues ? this.values().map((v, i) => { return Utility.cloneValue(v); }) : this)
			// ...(cloneValues ? this.entries().map(([k, v], i) => { return Utility.cloneValue(v); }) : this)
			...(cloneValues ? this.map((v, k) => { return Utility.cloneValue(v); }) : this)
		);
	}

	static uniqueKeys(...collections) {
		return new ArrayT2(
			{},
			...collections.reduce((acc, v_collection, k_collection) => {
				// return new Set([...acc, ...v_collection.keys()]);
				return acc.union(new Set([...v_collection.keys()]));
			}, new Set()).values()
		);
	}
	static uniqueValues(...collections) {
		return new ArrayT2(
			{},
			...collections.reduce((acc, v_collection, k_collection) => {
				// return new Set([...acc, ...v_collection.values()]);
				return acc.union(new Set([...v_collection.values()]));
			}, new Set()).values()
		);
	}

	static range(...args) {
		switch (args.length) {
			case 1:
				return new ArrayT2({}, ...new Array(Math.floor(args[0])).keys());
			case 2:
				return new ArrayT2({}, ...new Array(Math.floor(args[1] - args[0])).keys().map((v, i) => {
					return args[0] + v;
				}));
			case 3:
				return new ArrayT2({}, ...new Array(Math.floor((args[1] - args[0]) / args[2])).keys().map((v, i) => {
					return args[0] + v*args[2];
				}));
			default:
				return new ArrayT2({}, ...args);
		}
	}

	static zip(...arrays) {
		return ArrayT2.uniqueKeys(...arrays).map((v, k) => {
			return arrays.map((v_array, k_array) => {
				return v_array[v];
			});
		});
	}

	add(object, index) {
		ErrorT2.throw(ErrorT2.MESSAGE.NOT_IMPLEMENTED, { cause: this.type });
	}
	addAt(object, index) {
		return this.splice(index, 0, object);
	}
	addLast(object) {
		this.push(object);
		// this[this.length] = object;
	}
	remove(object) {
		ErrorT2.throw(ErrorT2.MESSAGE.NOT_IMPLEMENTED, { cause: this.type });
	}
	removeAt(index) {
		return this.splice(index, 1);
	}
	removeLast() {
		return this.pop();
	}

	get(index) {
		return this.at(index);
		// return this[index];
	}
	set(object, index) {
		this[index] = object;
	}
	replace(key, value) {
		// return delete this[key] && (this[key] = value, this);
		return (this[key] = value, this);
	}

	size() {
		return this.length;
	}
	clear() {
		this.length = 0;
		// this.splice(0, this.length);
	}

	fromArray(array, offset = 0, size = array.length - offset) {
		this.clear();

		for (let i = 0; i < size; i++) {
			this[i] = array[offset + i];
		}


		return this;
	}
};
