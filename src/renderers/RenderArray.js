import { ArrayT2 } from "../core/ArrayT2.js";


export class RenderArray extends ArrayT2 {


	static DEFAULT = {
		TYPE: "RenderArray",
		NAME: "",
	};


	constructor(args = {}, ...rest) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : RenderArray.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : RenderArray.DEFAULT.NAME,
			},
			...rest
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
