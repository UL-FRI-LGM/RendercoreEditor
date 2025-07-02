import { ObjectBase } from "../ObjectBase.js";
import { Layout } from "./Layout.js";
import { ErrorT2 } from "../../ErrorT2.js";


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


	copy(destination) {
		if (!(destination instanceof Destination)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

		super.copy(destination);

		if (this.arrayBuffer) this.arrayBuffer.copy(destination.arrayBuffer);
		this.layout.copy(destination.layout);


		return this;
	}
	clone() {
		return new Destination(
			Object.assign(
				super.clone(),
				{
					buffer: (this.buffer === Object(this.buffer)) ? this.buffer.clone() : this.buffer,
					layout: (this.layout === Object(this.layout)) ? this.layout.clone() : this.layout,
				}
			)
		);
	}
};
