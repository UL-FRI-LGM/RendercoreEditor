import {_Math} from '../math/Math.js';


export class MapObjectBase extends Map {


	static DEFAULT = {
		UUID: { value: null, generator: () => { return _Math.generateUUID(); } },
		TYPE: "MapObjectBase",
		NAME: "",
	};


	#uuid;
	#type;
	#name;


	constructor(args = {}, iterable = undefined) {
		super(iterable);
		
		this.uuid = (args.uuid !== undefined) ? args.uuid : { ...MapObjectBase.DEFAULT.UUID, value: MapObjectBase.DEFAULT.UUID.generator() };
		this.type = (args.type !== undefined) ? args.type : MapObjectBase.DEFAULT.TYPE;
		this.name = (args.name !== undefined) ? args.name : MapObjectBase.DEFAULT.NAME;
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
