import {_Math} from '../math/Math.js';


export class ObjectBase {
	static DEFAULT = {
		NAME: "",
		TYPE: "ObjectBase"
	};


	#uuid;
	#type;
	#name;


	constructor(args = {}) {
		this.uuid = (args.uuid !== undefined) ? args.uuid : _Math.generateUUID();
		this.name = (args.name !== undefined) ? args.name : ObjectBase.DEFAULT.NAME;
		this.type = (args.type !== undefined) ? args.type : ObjectBase.DEFAULT.TYPE;
	}


	get uuid() { return this.#uuid }
	set uuid(uuid){ this.#uuid = uuid; }
	get type() { return this.#type; }
	set type(type) { this.#type = type; }
	get name() { return this.#name; }
	set name(name) { this.#name = name; }
}