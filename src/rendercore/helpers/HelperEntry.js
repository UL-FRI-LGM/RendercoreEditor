import { ObjectBase } from "../core/ObjectBase.js";


export class HelperEntry extends ObjectBase {


	static DEFAULT = {
		TYPE: "HelperEntry",
		NAME: "",

		OBJECT: null,
		ENABLED: false,
	};


	#object;
	#enabled;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : HelperEntry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : HelperEntry.DEFAULT.NAME,
			}
		);

		this.object = (args.object !== undefined) ? args.object : HelperEntry.DEFAULT.OBJECT;
		this.enabled = (args.enabled !== undefined) ? args.enabled : HelperEntry.DEFAULT.ENABLED;
	}


	get object() { return this.#object; }
	set object(object) { this.#object = object; }
	get enabled() { return this.#enabled; }
	set enabled(enabled) { this.#enabled = enabled; }


	// clone() {
	// 	return new HelperEntry(this);
	// }

	clone() {
		return new HelperEntry(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,

				object: (this.object === Object(this.object)) ? this.object.clone() : this.object,
				enabled: (this.enabled === Object(this.enabled)) ? this.enabled.clone() : this.enabled,
			}
		);
	}
};
