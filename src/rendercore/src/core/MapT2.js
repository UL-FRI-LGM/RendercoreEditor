import { MapObjectBase } from "./MapObjectBase.js";
import { ErrorT2 } from "../ErrorT2.js";
import { Utility } from "../Utility.js";


export class MapT2 extends MapObjectBase {


	static DEFAULT = {
		TYPE: "MapT2",
		NAME: "",
	};


	constructor(args = {}, iterable = undefined) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : MapT2.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : MapT2.DEFAULT.NAME,
			},
			iterable
		);
	}


	copy(mapT2, copyValues = true) {
		if (!(mapT2 instanceof MapT2)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

		return copyValues ? MapT2.zip(this, mapT2).reduce((acc_this, [v1, v2], k) => {
			// return (acc_this.set(k, Utility.copyValue(v1, v2)), acc_this);
			return acc_this.replace(k, Utility.copyValue(v1, v2));
		}, super.copy(mapT2)) : super.copy(mapT2);
	}
	// clone() {
	// 	// return new MapT2(this, [...this]);
	// 	return new MapT2(this, this);
	// }
	clone(cloneValues = true) {
		// const originalMap = this;
		// const clonedMap = new MapT2();

		// originalMap.forEach((value, key) => {
		// 	const clonedKey = Utility.cloneValue(key);
		// 	const clonedValue = Utility.cloneValue(value);

		// 	clonedMap.set(clonedKey, clonedValue);
		// });
	

		// return clonedMap;
		return new MapT2(
			Object.assign(super.clone(), {}),
			// cloneValues ? [...this].map(([k, v], i) => { return [k, Utility.cloneValue(v)]; }) : this
			// cloneValues ? this.entries().map(([k, v], i) => { return [k, Utility.cloneValue(v)]; }) : this
			// cloneValues ? this.entries().map(([k, v], i) => { return [k, Utility.cloneValue(v)]; }) : this
			cloneValues ? this.map((v, k) => { return Utility.cloneValue(v); }) : this
		);
	}

	static uniqueKeys(...collections) {
		return new MapT2(
			{},
			collections.reduce((acc, v_collection, k_collection) => {
				// return new Set([...acc, ...v_collection.keys()]);
				return acc.union(new Set([...v_collection.keys()]));
			}, new Set()).entries()
		);
	}
	static uniqueValues(...collections) {
		return new MapT2(
			{},
			collections.reduce((acc, v_collection, k_collection) => {
				// return new Set([...acc, ...v_collection.values()]);
				return acc.union(new Set([...v_collection.values()]));
			}, new Set()).entries()
		);
	}

	static range(...args) {
		switch (args.length) {
			case 1:
				return new MapT2({}, [...new Array(Math.floor(args[0])).keys()].entries());
			case 2:
				return new MapT2({}, [...new Array(Math.floor(args[1] - args[0])).keys().map((v, i) => {
					return args[0] + v;
				})].entries());
			case 3:
				return new MapT2({}, [...new Array(Math.floor((args[1] - args[0]) / args[2])).keys().map((v, i) => {
					return args[0] + v*args[2];
				})].entries());
			default:
				return new MapT2({}, args.entries());
		}
	}

	static zip(...maps) {
		return MapT2.uniqueKeys(...maps).map((v, k) => {
			return maps.map((v_map, k_array) => {
				return v_map.get(v);
			});
		});
	}

	filter(predicate, thisArg = undefined) {
		return new MapT2({}, this.entries().filter(([k, v], i) => {
			return predicate.call(thisArg, v, k);
		}));
	}
	map(callbackFn, thisArg = undefined) {
		return new MapT2({}, this.entries().map(([k, v], i) => {
			return [k, callbackFn.call(thisArg, v, k)];
		}));
	}
	reduce(callbackFn, initialValue = undefined) {
		return this.entries().reduce((acc, [k, v], i) => {
			return callbackFn(acc, v, k);
		}, initialValue);
	}

	replace(key, value) {
		// return this.delete(key) && this.set(key, value);
		return this.set(key, value);
	}
};
