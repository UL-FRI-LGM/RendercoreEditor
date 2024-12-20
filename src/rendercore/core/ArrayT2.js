import { ArrayObjectBase } from "./ArrayObjectBase.js";


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


	// clone() {
	// 	return new ArrayT2(this, ...this);
	// }

	clone(cloneValues = true) {
		// return this.map((x) => { return (x === Object(x)) ? x.clone() : x; });
		return new ArrayT2(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
			},
			// ...this.map((x) => { return cloneValues ? ((x === Object(x)) ? x.clone() : x) : x; })
			...[...this.entries()].map(([k, v]) => { return cloneValues ? ((v === Object(v)) ? v.clone() : v) : v; })
		);
	}

	add(object, index) {
		throw new Error("NOT IMPLEMENTED");
	}
	addAt(object, index) {
		return this.splice(index, 0, object);
	}
	addLast(object) {
		this.push(object);
		// this[this.length] = object;
	}
	remove(object) {
		throw new Error("NOT IMPLEMENTED");
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

	size() {
		return this.length;
	}
	clear() {
		this.length = 0;
		// this.splice(0, this.length);
	}
};
