import { ObjectBase } from "../ObjectBase.js";
import { Layout } from "./Layout.js";


export class Destination extends ObjectBase {


	static DEFAULT = {
		TYPE: "Destination",
		NAME: "",

		BUFFER: null,
		LAYOUT: new Layout(
            {
                offset: 0
            }
        ),
	};


	#buffer;
	#layout;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : Destination.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Destination.DEFAULT.NAME,
			}
		);

		this.buffer = (args.buffer !== undefined) ? args.buffer : Destination.DEFAULT.BUFFER;
		this.layout = (args.layout !== undefined) ? args.layout : Destination.DEFAULT.LAYOUT.clone();
	}


	get buffer() { return this.#buffer; }
	set buffer(buffer) { this.#buffer = buffer; }
	get layout() { return this.#layout; }
	set layout(layout) { this.#layout = layout; }


	clone() {
		return new Destination(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,

				buffer: (this.buffer === Object(this.buffer)) ? this.buffer.clone() : this.buffer,
				layout: (this.layout === Object(this.layout)) ? this.layout.clone() : this.layout,
			}
		);
	}
};
