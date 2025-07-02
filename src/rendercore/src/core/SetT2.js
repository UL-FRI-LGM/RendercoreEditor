import { SetObjectBase } from "./SetObjectBase.js";
import { ErrorT2 } from "../ErrorT2.js";
import { Utility } from "../Utility.js";


export class SetT2 extends SetObjectBase {


	static DEFAULT = {
		TYPE: "SetT2",
		NAME: "",
	};


	constructor(args = {}, iterable = undefined) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SetT2.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SetT2.DEFAULT.NAME,
			},
			iterable
		);
	}


	copy(setT2, copyValues = true) {
		if (!(setT2 instanceof SetT2)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

		return copyValues ? SetT2.zip(this, setT2).reduce((acc_this, [v1, v2], k) => {
			// return (acc_this.delete(v1), acc_this.add(Utility.copyValue(v1, v2)), acc_this);
			return acc_this.replace(v1, Utility.copyValue(v1, v2));
		}, super.copy(setT2)) : super.copy(setT2);
	}
	// clone() {
	// 	// return new SetT2(this, [...this]);
	// 	return new SetT2(this, this);
	// }
	clone(cloneValues = true) {
		// const originalSet = this;
		// const clonedSet = new SetT2();

		// originalSet.forEach((value, key) => {
		// 	// const clonedKey = Utility.cloneValue(key);
		// 	const clonedValue = Utility.cloneValue(value);

		// 	clonedSet.add(clonedValue);
		// });
	

		// return clonedSet;
		return new SetT2(
			Object.assign(super.clone(), {}),
			// cloneValues ? [...this].map((v, i) => { return Utility.cloneValue(v); }) : this
			// cloneValues ? this.values().map((v, i) => { return Utility.cloneValue(v); }) : this
			// cloneValues ? this.entries().map(([k, v], i) => { return Utility.cloneValue(v); }) : this
			cloneValues ? this.map((v, k) => { return Utility.cloneValue(v); }) : this
		);
	}

	static uniqueKeys(...collections) {
		return new SetT2(
			{},
			collections.reduce((acc, v_collection, k_collection) => {
				// return new Set([...acc, ...v_collection.keys()]);
				return acc.union(new Set([...v_collection.keys()]));
			}, new Set()).values()
		);
	}
	static uniqueValues(...collections) {
		return new SetT2(
			{},
			collections.reduce((acc, v_collection, k_collection) => {
				// return new Set([...acc, ...v_collection.values()]);
				return acc.union(new Set([...v_collection.values()]));
			}, new Set()).values()
		);
	}

	static range(...args) {
		switch (args.length) {
			case 1:
				return new SetT2({}, new Array(Math.floor(args[0])).keys());
			case 2:
				return new SetT2({}, new Array(Math.floor(args[1] - args[0])).keys().map((v, i) => {
					return args[0] + v;
				}));
			case 3:
				return new SetT2({}, new Array(Math.floor((args[1] - args[0]) / args[2])).keys().map((v, i) => {
					return args[0] + v*args[2];
				}));
			default:
				return new SetT2({}, args);
		}
	}

	static zip(...sets) {
		return SetT2.uniqueKeys(...sets).map((v, k) => {
			return sets.map((v_set, k_array) => {
				return v_set.has(v) ? v : undefined;
			});
		});
	}

	filter(predicate, thisArg = undefined) {
		return new SetT2({}, this.entries().filter(([k, v], i) => {
			return predicate.call(thisArg, v, k);
		}));
	}
	map(callbackFn, thisArg = undefined) {
		return new SetT2({}, this.entries().map(([k, v], i) => {
			return callbackFn.call(thisArg, v, k);
		}));
	}
	reduce(callbackFn, initialValue = undefined) {
		return this.entries().reduce((acc, [k, v], i) => {
			return callbackFn(acc, v, k);
		}, initialValue);
	}

	replace(key, value) {
		// return this.delete(key) && this.add(value);
		return (this.delete(key), this.add(value));
	}
};
