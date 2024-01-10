import { HelperEntry } from "./HelperEntry.js";


export class MeshHelperEntry extends HelperEntry {


	static DEFAULT = {
		TYPE: "MeshHelperEntry",
		NAME: "",

		OBJECT: null,
		ENABLED: false,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : MeshHelperEntry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : MeshHelperEntry.DEFAULT.NAME,

				object: (args.object !== undefined) ? args.object : MeshHelperEntry.DEFAULT.OBJECT,
				enable: (args.enabled !== undefined) ? args.enabled : MeshHelperEntry.DEFAULT.ENABLED,
			}
		);
	}


	// clone() {
	// 	return new MeshHelperEntry(this);
	// }

	clone() {
		return new MeshHelperEntry(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,

				object: (this.object === Object(this.object)) ? this.object.clone() : this.object,
				enabled: (this.enabled === Object(this.enabled)) ? this.enabled.clone() : this.enabled,
			}
		);
	}
};
