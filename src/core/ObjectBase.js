import {_Math} from '../math/Math.js';


export class ObjectBase extends Object {


	static DEFAULT = {
		UUID: { value: null, generator: () => { return _Math.generateUUID(); } },
		TYPE: "ObjectBase",
		NAME: "",
	};


	#uuid;
	#type;
	#name;


	constructor(args = {}) {
		super();

		this.uuid = (args.uuid !== undefined) ? args.uuid : { ...ObjectBase.DEFAULT.UUID, value: ObjectBase.DEFAULT.UUID.generator() };
		this.type = (args.type !== undefined) ? args.type : ObjectBase.DEFAULT.TYPE;
		this.name = (args.name !== undefined) ? args.name : ObjectBase.DEFAULT.NAME;
	}


	get uuid() { return this.#uuid }
	set uuid(uuid){ this.#uuid = uuid; }
	get type() { return this.#type; }
	set type(type) { this.#type = type; }
	get name() { return this.#name; }
	set name(name) { this.#name = name; }
}
