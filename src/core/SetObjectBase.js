import {_Math} from '../math/Math.js';


export class SetObjectBase extends Map {


	static DEFAULT = {
		UUID: { value: null, generator: () => { return _Math.generateUUID(); } },
		TYPE: "SetObjectBase",
		NAME: "",
	};


	#uuid;
	#type;
	#name;


	constructor(args = {}) {
		super();
		
		this.uuid = (args.uuid !== undefined) ? args.uuid : { ...SetObjectBase.DEFAULT.UUID, value: SetObjectBase.DEFAULT.UUID.generator() };
		this.type = (args.type !== undefined) ? args.type : SetObjectBase.DEFAULT.TYPE;
		this.name = (args.name !== undefined) ? args.name : SetObjectBase.DEFAULT.NAME;
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
