import {_Math} from '../math/Math.js';


export class ArrayObjectBase extends Array {


	static DEFAULT = {
		UUID: { value: null, generator: () => { return _Math.generateUUID(); } },
		TYPE: "ArrayObjectBase",
		NAME: "",
	};


	#uuid;
	#type;
	#name;


	constructor(args = {}, ...rest) {
		super(...rest);
		
		this.uuid = (args.uuid !== undefined) ? args.uuid : { ...ArrayObjectBase.DEFAULT.UUID, value: ArrayObjectBase.DEFAULT.UUID.generator() };
		this.type = (args.type !== undefined) ? args.type : ArrayObjectBase.DEFAULT.TYPE;
		this.name = (args.name !== undefined) ? args.name : ArrayObjectBase.DEFAULT.NAME;
	}


	get uuid() { return this.#uuid }
	set uuid(uuid){ this.#uuid = uuid; }
	get type() { return this.#type; }
	set type(type) { this.#type = type; }
	get name() { return this.#name; }
	set name(name) { this.#name = name; }


	clone() {
		throw new Error("NOT IMPLEMENTED");
	}
};
