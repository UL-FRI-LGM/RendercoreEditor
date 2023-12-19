import { ArrayObjectBase } from "../core/ArrayObjectBase.js";


export class RenderArray extends ArrayObjectBase {


	static DEFAULT = {
		TYPE: "RenderArray",
		NAME: "",
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : RenderArray.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : RenderArray.DEFAULT.NAME,
			}
		);
	}


	add(object, index) {
		throw new Error("NOT IMPLEMENTED");
	}
	addLast(object) {
		this.push(object);
		// this[this.length] = object;
	}
	remove(object, index) {
		throw new Error("NOT IMPLEMENTED");
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

	clear() {
		this.length = 0;
		// this.splice(0, this.length);
	}
};
