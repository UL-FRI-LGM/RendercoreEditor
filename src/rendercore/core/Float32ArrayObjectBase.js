import {_Math} from '../math/Math.js';


export class Float32ArrayObjectBase extends Float32Array {


	static DEFAULT = {
		UUID: { value: null, generator: () => { return _Math.generateUUID(); } },
		TYPE: "Float32ArrayObjectBase",
		NAME: "",
	};


	#uuid;
	#type;
	#name;


	constructor(args = {}, ...rest) {
		super(...rest);
		
		this.uuid = (args.uuid !== undefined) ? args.uuid : { ...Float32ArrayObjectBase.DEFAULT.UUID, value: Float32ArrayObjectBase.DEFAULT.UUID.generator() };
		this.type = (args.type !== undefined) ? args.type : Float32ArrayObjectBase.DEFAULT.TYPE;
		this.name = (args.name !== undefined) ? args.name : Float32ArrayObjectBase.DEFAULT.NAME;
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
